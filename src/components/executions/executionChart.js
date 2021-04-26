import React from "react";
import { Link } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";

const ExecutionList = ({ execution }) => {
  function count(object) {
    if (count === null) {
      return "-";
    } else {
      return object;
    }
  }

  const chartData = [
    { title: "passed", value: parseInt(execution.passed), color: "#2cb14a" },
    { title: "failed", value: parseInt(execution.failed), color: "#C13C37" },
    { title: "TBD", value: parseInt(execution.tbd), color: "#8D8D8D" },
  ];

  return (
    <div className="row">
      <div className="one-half column graph">
        <PieChart
          data={chartData}
          lineWidth={25}
          radius={25}
          rounded
          label={() => execution.testcase_count}
          labelStyle={{
            fontSize: "15px",
            fontFamily: "sans-serif",
            fill: "#8D8D8D",
          }}
          labelPosition={0}
          animate
        />
      </div>
      <div className="one-half column statuses">
        <div>
          <p className="passed">
            {chartData[0].value} {chartData[0].title}
          </p>
          <p className="failed">
            {chartData[1].value} {chartData[1].title}
          </p>
          <p className="tbd">
            {chartData[2].value} {chartData[2].title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExecutionList;
