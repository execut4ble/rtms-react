import React from "react";
import { Link } from "react-router-dom";

const FeatureList = ({ feature }) => {
  function count(object) {
    if (count === null) {
      return "-";
    } else {
      return object;
    }
  }

  return (
    <tr>
      <td id="ticket">{feature.ticket}</td>
      <td id="sprint">{feature.sprint}</td>
      <td id="title">
        <Link to={`/features/${feature.id}`}>{feature.name}</Link>
      </td>
      <td id="testcaseCount">{count(feature.testcases)}</td>
      <td id="defectCount">{count(feature.defects)}</td>
    </tr>
  );
};

export default FeatureList;
