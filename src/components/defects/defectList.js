import React from "react";
import { Link } from "react-router-dom";

const DefectList = ({ defect }) => {
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
      <td>
        <Link to={`/features/${defect.feature}`}>{defect.feature_name}</Link>
      </td>
      <td>{defect.ticket}</td>
      <td>
        <Link to={`/defects/${defect.id}`}>{defect.name}</Link>
      </td>
      <td>{capitalizeFirstLetter(defect.priority)}</td>
      <td>{isOpen(defect.is_active)}</td>
    </tr>
  );
};

export default DefectList;
