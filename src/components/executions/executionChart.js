import React from "react";
import { PieChart } from "react-minimal-pie-chart";

const ExecutionList = ({ execution, dashboard }) => {
  const chartData = [
    { title: "passed", value: parseInt(execution.passed), color: "#2cb14a" },
    { title: "failed", value: parseInt(execution.failed), color: "#C13C37" },
    { title: "TBD", value: parseInt(execution.tbd), color: "#8D8D8D" },
  ];

  if (dashboard) {
    return (
      <div className="u-full-width">
        <PieChart
          data={chartData}
          lineWidth={25}
          radius={25}
          rounded
          label={({ dataEntry }) =>
            dataEntry.value > 0 && dataEntry.value + " " + dataEntry.title
          }
          labelStyle={(index) => ({
            fill: chartData[index].color,
            fontSize: "6px",
            fontFamily: "sans-serif",
          })}
          labelPosition={120}
          animate
        />
      </div>
    );
  }

  return (
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
  );
};

export default ExecutionList;
