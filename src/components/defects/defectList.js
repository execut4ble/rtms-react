import React from "react";
import { Link } from "react-router-dom";

const DefectList = ({ defect, dashboard }) => {
  function isOpen(object) {
    if (object) {
      return "Open";
    } else {
      return "Closed";
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <tr>
      {!dashboard && (
        <td id="featureName">
          <Link to={`/features/${defect.feature}`}>{defect.feature_name}</Link>
        </td>
      )}
      <td id="ticket">{defect.ticket}</td>
      <td id="title">
        <Link to={`/defects/${defect.id}`}>{defect.name}</Link>
      </td>
      <td id="priority">{capitalizeFirstLetter(defect.priority)}</td>
      {!dashboard && <td>{isOpen(defect.is_active)}</td>}
    </tr>
  );
};

export default DefectList;
