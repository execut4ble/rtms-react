import React from "react";
import { Link } from "react-router-dom";

const ExecutionTestsTable = ({ test }) => {
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
      <td style={{ textTransform: "capitalize" }}>{test.status}</td>
    </tr>
  );
};

export default ExecutionTestsTable;
