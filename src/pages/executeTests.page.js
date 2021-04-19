import React, { useState, useEffect } from "react";
import apiclient from "../apiclient";
import ExecutionTestsTable from "../components/executionTestsTable";
import ExecutionInfo from "../components/executionInfo";

function ExecuteTests(props) {
  const executionID = props.match.params.id;
  const [tests, setTestcases] = useState([]);
  const [executionInfo, setExecutionInfo] = useState([]);

  useEffect(() => {
    apiclient.get("/runs/" + executionID).then((response) => {
      setExecutionInfo(response.data);
    });
  }, [executionID]);

  useEffect(() => {
    apiclient.get("/runtests/" + executionID).then((response) => {
      setTestcases(response.data);
    });
  }, [executionID]);

  return (
    <div className="feature-testcases">
      <div class="section livefeed" id="feed">
        <div class="container">
          <div class="row">
            <div class="twelve columns">
              {executionInfo.map((execution, i) => (
                <ExecutionInfo key={i} execution={execution} />
              ))}

              <table class="u-full-width">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Scenario</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((test, i) => (
                    <ExecutionTestsTable key={i} test={test} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* <a class="button button-primary" href="#browse">
            Load more
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default ExecuteTests;
