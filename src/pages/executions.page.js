import React, { useState, useEffect, useRef } from "react";
import apiclient from "../apiclient";
import ExecutionCard from "../components/executions/executionCard";
import ExecutionChart from "../components/executions/executionChart";
import LoadingSpinner from "../components/loadingSpinner";
import AddExecution from "../components/executions/modalAddExecution";
import useToken from "../components/useToken";

function Executions() {
  const { token } = useToken();
  const [executions, setExecutions] = useState([]);
  const [isEmpty, setEmpty] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [showInactiveState, setShowInactive] = useState("");

  const page = 2;
  const ref = useRef(page);

  const loopExecutions = () => {
    apiclient(token)
      .get("/runs/active")
      .then((response) => {
        const data = response.data;
        setLoading(false);
        setEmpty(data.length < 30);
        setExecutions([...executions, ...data]);
      });
  };

  useEffect(() => {
    loopExecutions();
  }, []);

  const handleShowMoreExecutions = () => {
    loopExecutions(ref.current, ref.current + page);
    setLoading(true);
    ref.current += 1;
  };

  const handleShowInactive = (event) => {
    if (!event.target.checked) {
      setShowInactive("");
    } else {
      setShowInactive("active");
    }
    apiclient(token)
      .get("/runs/" + showInactiveState)
      .then((response) => {
        setExecutions(response.data);
      });
  };

  return (
    <div className="section executions" id="feed">
      <div className="container">
        <p className="feed-description"></p>
        <h3 className="section-heading">Test Executions</h3>
        <input
          type="checkbox"
          checked={showInactiveState}
          id="showInactive"
          onChange={handleShowInactive}
        ></input>
        <label htmlFor="isActive" className="activeChkBox">
          Show inactive
        </label>
        <AddExecution executions={executions} setExecutions={setExecutions} />
        {isLoading && executions.length === 0 && <LoadingSpinner />}
        {executions.map((execution, i) => (
          <div className="row" key={i}>
            <div className="one-half column">
              {(!isLoading || executions.length > 0) && (
                <ExecutionCard execution={execution} />
              )}
            </div>
            <div className="one-half column">
              <ExecutionChart execution={execution} />
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
