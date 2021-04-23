import React, { useState, useEffect, useRef } from "react";
import apiclient from "../apiclient";
import ExecutionCard from "../components/executionCard";
import ExecutionChart from "../components/executionChart";
import LoadingSpinner from "../components/loadingSpinner";
import AddExecution from "../components/modalAddExecution";

function Executions() {
  const [executions, setExecutions] = useState([]);
  const [isEmpty, setEmpty] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const page = 2;
  const ref = useRef(page);

  const loopExecutions = () => {
    apiclient.get("/runs").then((response) => {
      const data = response.data;
      setLoading(false);
      setEmpty(data.length < 30);
      setExecutions([...executions, ...data]);
    });
  };

  useEffect(() => {
    loopExecutions(1, page);
  }, []);

  const handleShowMoreExecutions = () => {
    loopExecutions(ref.current, ref.current + page);
    setLoading(true);
    ref.current += 1;
  };

  return (
    <div className="section executions" id="feed">
      <div className="container">
        <p className="feed-description"></p>
        <h3 className="section-heading">Test Executions</h3>
        <AddExecution executions={executions} setExecutions={setExecutions} />
        {isLoading && executions.length === 0 && <LoadingSpinner />}
        {executions.map((execution, i) => (
          <div className="row">
            <div className="one-half column">
              {(!isLoading || executions.length > 0) && (
                <ExecutionCard key={i} execution={execution} />
              )}
            </div>
            <div className="one-half column">
              <ExecutionChart key={i} execution={execution} />
            </div>
          </div>
        ))}
        {!isEmpty && !isLoading && (
          <div
            className="button button-primary"
            onClick={handleShowMoreExecutions}
          >
            Load more
          </div>
        )}
        {isLoading && executions.length > 0 && <LoadingSpinner />}
      </div>
    </div>
  );
}

export default Executions;
