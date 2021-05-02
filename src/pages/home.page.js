import Dashboard from "../components/dashboard";
import React, { useState, useEffect, useRef } from "react";
import apiclient from "../apiclient";
import ExecutionCard from "../components/executions/executionCard";
import ExecutionChart from "../components/executions/executionChart";
import LoadingSpinner from "../components/loadingSpinner";
import DefectList from "../components/defects/defectList";
import useToken from "../components/useToken";

function Home() {
  const { token } = useToken();
  const [executions, setExecutions] = useState([]);
  const [defects, setDefects] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isEmptyDefects, setEmptyDefects] = useState(false);
  const [isEmptyExecutions, setEmptyExecutions] = useState(false);
  const [dashboard] = useState(true);

  const loopExecutions = () => {
    apiclient(token)
      .get("/watched/")
      .then((response) => {
        const data = response.data;
        setLoading(false);
        setExecutions([...executions, ...data]);
        setEmptyExecutions(executions.length === 0);
      });
  };

  const loopDefects = () => {
    apiclient(token)
      .get("/defects/open")
      .then((response) => {
        const data = response.data;
        setLoading(false);
        setDefects([...executions, ...data]);
        setEmptyDefects(defects.length === 0);
      });
  };

  useEffect(() => {
    loopExecutions();
    loopDefects();

    const interval = setInterval(() => {
      loopExecutions();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <div className="section" id="dashboard">
        <div className="container">
          <h3 className="section-heading">Dashboard</h3>
          <div className="row">
            <div className="one-half column">
              <h4>Open defects</h4>
              {isLoading && defects.length === 0 && <LoadingSpinner />}
              {(!isLoading || defects.length > 0) && (
                <table className="u-full-width">
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Title</th>
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {defects.map((defect, i) => (
                      <DefectList
                        key={i}
                        defect={defect}
                        dashboard={dashboard}
                      />
                    ))}
                  </tbody>
                </table>
              )}
              {isEmptyDefects && defects.length === 0 && (
                <center>
                  <p>There are no active defects at the moment.</p>
                </center>
              )}
            </div>
            <div className="one-half column">
              <h4>Watched executions</h4>
              {isEmptyExecutions && executions.length === 0 && (
                <center>
                  <p>You are not watching any executions.</p>
                </center>
              )}
              {executions.map((execution, i) => (
                <div className="row" key={i}>
                  <div className="one-half column statuses">
                    {(!isLoading || executions.length > 0) && (
                      <ExecutionCard
                        execution={execution}
                        dashboard={dashboard}
                      />
                    )}
                  </div>
                  <div className="one-half column">
                    <ExecutionChart
                      execution={execution}
                      dashboard={dashboard}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
