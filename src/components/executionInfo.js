import userEvent from "@testing-library/user-event";
import React from "react";

function ExecutionInfo({ execution }) {
  function formatDate(unixTimeStamp) {
    var date = new Date(unixTimeStamp * 1000);

    var dateString = date.toLocaleDateString("en-US", {
      hour12: false,
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    var timeString = date.toLocaleTimeString("en-US", {
      hour12: false,
    });

    return timeString + " on " + dateString;
  }

  return (
    <div>
      <h3>{execution.name}</h3>
      <p className="feature-description">{execution.description}</p>
      <p className="feature-metadata">
        Created by: {execution.created_user} at{" "}
        {formatDate(execution.created_date)}
        <br />
        Last edited by: {execution.modified_user} at{" "}
        {formatDate(execution.modified_date)}
      </p>
    </div>
  );
}

export default ExecutionInfo;
