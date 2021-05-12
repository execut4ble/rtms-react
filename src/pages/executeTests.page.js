import React, { useState, useEffect } from "react";
import apiclient from "../apiclient";
import ExecutionTestsTable from "../components/executions/executionTestsTable";
import ExecutionInfo from "../components/executions/executionInfo";
import EditExecution from "../components/executions/modalEditExecution";
import DeleteExecution from "../components/executions/modalDeleteExecution";
import useToken from "../components/useToken";
import WatchButton from "../components/executions/watchButton";

function ExecuteTests(props) {
  const { token } = useToken();
  const executionID = props.match.params.id;
  const [tests, setTestcases] = useState([]);
  const [executionInfo, setExecutionInfo] = useState([]);
  const [isModified, setModified] = useState(false);

  useEffect(() => {
    apiclient(token)
      .get("/runs/" + executionID)
      .then((response) => {
        setExecutionInfo(response.data);
        if (response.data[0].modified_date) {
          setModified(true);
        }
      });
  }, [executionID]);

  useEffect(() => {
    apiclient(token)
      .get("/runtests/" + executionID)
      .then((response) => {
        setTestcases(response.data);
      });
  }, [executionID]);

  return (
    <div className="feature-testcases">
      <div className="section livefeed" id="feed">
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              {executionInfo.map((execution, i) => (
                <ExecutionInfo
                  key={i}
                  execution={execution}
                  isModified={isModified}
                />
              ))}
              <div className="row">
                <div className="three columns">
                  {executionInfo.map((execution, i) => (
                    <EditExecution
                      key={i}
                      execution={execution}
                      executionInfo={executionInfo}
                      setExecutionInfo={setExecutionInfo}
                      executionID={executionID}
                      executionIndex={i}
                      setModified={setModified}
                    />
                  ))}
                </div>
                <div className="three columns">
                  <DeleteExecution executionID={executionID} />
                </div>
                <div className="three columns">
                  {executionInfo.map((execution, i) => (
                    <WatchButton
                      key={i}
                      execution={execution}
                      executionID={executionID}
                    />
                  ))}
                </div>
              </div>

              <table className="u-full-width">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Scenario</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((test, i) => (
                    <ExecutionTestsTable
                      key={i}
                      test={test}
                      executionID={executionID}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* <a className="button button-primary" href="#browse">
            Load more
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default ExecuteTests;
