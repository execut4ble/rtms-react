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
      <td>{test.id}</td>
      <td>{test.scenario}</td>
      <td>{formatDate(test.last_execution_date)}</td>
      <td>
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
        <DeleteTestcase
          featureID={test.feature}
          testcaseID={test.id}
          tests={tests}
          setTestcases={setTestcases}
        />
      </td>
    </tr>
  );
};

export default Testcases;
