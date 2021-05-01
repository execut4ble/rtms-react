import React, { useState, useEffect, useRef } from "react";
import apiclient from "../apiclient";
import DefectList from "../components/defects/defectList";
import LoadingSpinner from "../components/loadingSpinner";
import AddDefect from "../components/defects/modalAddDefect";
import useToken from "../components/useToken";

function Defects() {
  const { token } = useToken();
  const [defects, setDefects] = useState([]);
  const [isEmpty, setEmpty] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const page = 2;
  const ref = useRef(page);

  const loopDefects = () => {
    apiclient(token)
      .get("/defects")
      .then((response) => {
        const data = response.data;
        setLoading(false);
        setEmpty(data.length < 30);
        setDefects([...defects, ...data]);
      });
  };

  useEffect(() => {
    loopDefects(1, page);
  }, []);

  const handleShowMoreDefects = () => {
    loopDefects(ref.current, ref.current + page);
    setLoading(true);
    ref.current += 1;
  };

  return (
    <div className="section defects" id="feed">
      <div className="container">
        <p className="feed-description"></p>
        <div className="row">
          <div className="twelve columns">
            <h3 className="section-heading">Defects</h3>
            <AddDefect defects={defects} setDefects={setDefects} />
            {isLoading && defects.length === 0 && <LoadingSpinner />}
            {(!isLoading || defects.length > 0) && (
              <table className="u-full-width">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Ticket ID</th>
                    <th>Title</th>
                    <th>Priority</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {defects.map((defect, i) => (
                    <DefectList key={i} defect={defect} />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {!isEmpty && !isLoading && (
          <div
            className="button button-primary"
            onClick={handleShowMoreDefects}
          >
            Load more
          </div>
        )}
        {isLoading && defects.length > 0 && <LoadingSpinner />}
      </div>
    </div>
  );
}

export default Defects;
