import React, { useState, useEffect } from "react";
import apiclient from "../apiclient";
import DefectInfo from "../components/defects/defectInfo";
import EditDefect from "../components/defects/modalEditDefect";
import DeleteDefect from "../components/defects/modalDeleteDefect";
import useToken from "../components/useToken";

function DefectDetails(props) {
  const { token } = useToken();
  const defectID = props.match.params.id;
  const [defectInfo, setDefectInfo] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    apiclient(token)
      .get("/defects/" + defectID)
      .then((response) => {
        setDefectInfo(response.data);
      });
  }, [defectID]);

  useEffect(() => {
    apiclient(token)
      .get("/features")
      .then((response) => {
        const data = response.data;
        setFeatures([features, ...data]);
      });
  }, []);

  return (
    <div className="feature-testcases">
      <div className="section livefeed" id="feed">
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              {defectInfo.map((defect, i) => (
                <DefectInfo key={i} defect={defect} defectID={defectID} />
              ))}
              <div className="row">
                <div className="two columns">
                  {defectInfo.map((defect, i) => (
                    <EditDefect
                      key={i}
                      defect={defect}
                      defectInfo={defectInfo}
                      setDefectInfo={setDefectInfo}
                      defectID={defectID}
                      defectIndex={i}
                      features={features}
                    />
                  ))}
                </div>
                <div className="two columns">
                  <DeleteDefect defectID={defectID} />
                </div>
              </div>
            </div>
          </div>
          {/* <a className="button button-primary" href="#browse">
            Load more
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default DefectDetails;
