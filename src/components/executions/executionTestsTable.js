import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import apiclient from "../../apiclient";

const ExecutionTestsTable = ({ test, executionID }) => {
  const [testcaseStatus, setTestcaseStatus] = useState(test.status);
  const [newRunner, setRunner] = useState("2");
  const testcaseID = test.testcase_id;

  const handleExecute = () => {
    var statusToSend = "tbd";

    if (testcaseStatus === "tbd") {
      setTestcaseStatus("passed");
      statusToSend = "passed";
      updateStatus(statusToSend);
    } else if (testcaseStatus === "passed") {
      setTestcaseStatus("failed");
      statusToSend = "failed";
      updateStatus(statusToSend);
    } else if (testcaseStatus === "failed") {
      setTestcaseStatus("tbd");
      statusToSend = "tbd";
      updateStatus(statusToSend);
    }
  };

  function updateStatus(statusToSend) {
    apiclient
      .put("/runtests/" + executionID + "/" + testcaseID, {
        status: statusToSend,
        last_executed_by: newRunner,
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  function formatDate(unixTimeStamp) {
    var date = new Date(unixTimeStamp * 1000);

    var dateString = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return dateString;
  }

  return (
    <tr>
      <td>
        <Link to={`/features/${test.feature}`}>{test.feature_name}</Link>
      </td>
      <td>{test.scenario}</td>
      <td style={{ textTransform: "uppercase" }}>
        <button className={`execute ${testcaseStatus}`} onClick={handleExecute}>
          {testcaseStatus}
        </button>
      </td>
    </tr>
  );
};

export default ExecutionTestsTable;
