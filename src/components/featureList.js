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
      <td>{feature.ticket}</td>
      <td>{feature.sprint}</td>
      <td>
        <Link to={`/features/${feature.id}`}>{feature.name}</Link>
      </td>
      <td>{count(feature.testcases)}</td>
      <td>{count(feature.defects)}</td>
    </tr>
  );
};

export default FeatureList;
