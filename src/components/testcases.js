import React from "react";

const Testcases = ({ test }) => {
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
      <td style={{ textTransform: "capitalize" }}>{test.status}</td>
    </tr>
  );
};

export default Testcases;
