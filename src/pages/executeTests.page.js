import React, { useState, useEffect } from "react";
import apiclient from "../apiclient";
import ExecutionTestsTable from "../components/executions/executionTestsTable";
import ExecutionInfo from "../components/executions/executionInfo";
import EditExecution from "../components/executions/modalEditExecution";
import DeleteExecution from "../components/executions/modalDeleteExecution";

function ExecuteTests(props) {
  const executionID = props.match.params.id;
  const [tests, setTestcases] = useState([]);
  const [executionInfo, setExecutionInfo] = useState([]);

  useEffect(() => {
    apiclient()
      .get("/runs/" + executionID)
      .then((response) => {
        setExecutionInfo(response.data);
      });
  }, [executionID]);

  useEffect(() => {
    apiclient()
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
                <ExecutionInfo key={i} execution={execution} />
              ))}
              <div className="row">
                <div className="two columns">
                  {executionInfo.map((execution, i) => (
                    <EditExecution
                      key={i}
                      execution={execution}
                      executionInfo={executionInfo}
                      setExecutionInfo={setExecutionInfo}
                      executionID={executionID}
                      executionIndex={i}
                    />
                  ))}
                </div>
                <div className="two columns">
                  <DeleteExecution executionID={executionID} />
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
