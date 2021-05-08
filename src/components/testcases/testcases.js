import React from "react";
import EditTestcase from "../testcases/modalEditTestcase";
import DeleteTestcase from "./modalDeleteTestcase";

const Testcases = ({ test, tests, setTestcases, testcaseIndex }) => {
  function formatDate(unixTimeStamp) {
    if (unixTimeStamp === null) {
      return "-";
    } else {
      var date = new Date(unixTimeStamp * 1000);

      var dateString = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return dateString;
    }
  }

  return (
    <tr>
      <td id="id">{test.id}</td>
      <td id="scenario">{test.scenario}</td>
      <td id="lastExecutionDate">{formatDate(test.last_execution_date)}</td>
      <td>
        <div className="six columns">
          <EditTestcase
            tests={tests}
            testcaseIndex={testcaseIndex}
            testcaseID={test.id}
            testScenario={test.scenario}
            testDescription={test.description}
            setTestcases={setTestcases}
            featureID={test.feature}
            lastExecutionDate={test.last_execution_date}
          />
        </div>
        <DeleteTestcase
          featureID={test.feature}
          testcaseID={test.id}
          tests={tests}
          setTestcases={setTestcases}
          testcaseIndex={testcaseIndex}
        />
      </td>
    </tr>
  );
};

export default Testcases;
