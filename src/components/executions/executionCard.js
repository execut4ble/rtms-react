import React from "react";
import { Link } from "react-router-dom";

const ExecutionList = ({ execution, dashboard }) => {
  return (
    <div>
      <Link to={`/executions/${execution.id}`}>
        {!dashboard ? <h5>{execution.name}</h5> : <p>{execution.name}</p>}
      </Link>
      <p>{execution.testcase_count} test cases</p>
    </div>
  );
};

export default ExecutionList;
