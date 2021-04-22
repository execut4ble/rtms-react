import userEvent from "@testing-library/user-event";
import React from "react";

function FeatureInfo({ feature }) {
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
      <h3>{feature.name}</h3>

      <p className="feature-description">{feature.description}</p>
      <p className="feature-metadata">
        Created by: {feature.created_user} at {formatDate(feature.created_date)}
        <br />
        Last edited by: {feature.modified_user} at{" "}
        {formatDate(feature.modified_date)}
      </p>
    </div>
  );
}

export default FeatureInfo;
