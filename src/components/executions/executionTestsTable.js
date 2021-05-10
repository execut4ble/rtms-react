import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiclient from "../../apiclient";
import useToken from "../useToken";
import { toast } from "react-toastify";

const ExecutionTestsTable = ({ test, executionID }) => {
  const { token } = useToken();
  const [testcaseStatus, setTestcaseStatus] = useState(test.status);
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
    apiclient(token)
      .put("/runtests/" + executionID + "/" + testcaseID, {
        status: statusToSend,
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  return (
    <tr>
      <td id="feature">
        <Link to={`/features/${test.feature}`}>{test.feature_name}</Link>
      </td>
      <td id="scenario">{test.scenario}</td>
      <td id="status" style={{ textTransform: "uppercase" }}>
        <button className={`execute ${testcaseStatus}`} onClick={handleExecute}>
          {testcaseStatus}
        </button>
      </td>
    </tr>
  );
};

export default ExecutionTestsTable;
