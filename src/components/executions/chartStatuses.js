import React from "react";

const ChartStatuses = ({ execution }) => {
  return (
    <div className="one-half column statuses">
      <div>
        <p className="passed">{execution.passed} Passed</p>
        <p className="failed">{execution.failed} Failed</p>
        <p className="tbd">{execution.tbd} TBD</p>
      </div>
    </div>
  );
};

export default ChartStatuses;
