import React from "react";
import { Link } from "react-router-dom";

const ExecutionList = ({ execution }) => {
  return (
    <div>
      <Link to={`/executions/${execution.id}`}>
        <h5>{execution.name}</h5>
      </Link>
      <p>{execution.testcase_count} test cases</p>
    </div>
  );
};

export default ExecutionList;
