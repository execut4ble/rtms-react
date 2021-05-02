import React, { useState, useEffect } from "react";
import apiclient from "../apiclient";
import Testcases from "../components/testcases/testcases";
import FeatureInfo from "../components/features/featureInfo";
import AddTestsCTA from "../components/features/AddTestsCTA";
import EditFeature from "../components/features/modalEditFeature";
import DeleteFeature from "../components/features/modalDeleteFeature";
import AddTestcase from "../components/testcases/modalAddTestcase";
import useToken from "../components/useToken";

function FeatureTests(props) {
  const featureID = props.match.params.id;
  const [tests, setTestcases] = useState([]);
  const [featureInfo, setFeatureInfo] = useState([]);
  const [isEmpty, setEmpty] = useState(false);
  const { token } = useToken();

  useEffect(() => {
    apiclient(token)
      .get("/features/" + featureID)
      .then((response) => {
        setFeatureInfo(response.data);
      });
  }, [featureID]);

  useEffect(() => {
    apiclient(token)
      .get("/testcases/" + featureID)
      .then((response) => {
        setTestcases(response.data);
      });
    setEmpty(tests.length === 0);
  }, [featureID]);

  return (
    <div className="feature-testcases">
      <div className="section livefeed" id="feed">
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              {featureInfo.map((feature, i) => (
                <FeatureInfo key={i} feature={feature} />
              ))}
              <div className="row">
                <div className="three columns">
                  <AddTestcase
                    featureID={featureID}
                    setTestcases={setTestcases}
                    tests={tests}
                  />
                </div>
                <div className="three columns">
                  {/* sikari told me to add this loop i add yes */}
                  {featureInfo.map((feature, i) => (
                    <EditFeature
                      key={i}
                      featureIndex={i}
                      feature={feature}
                      featureInfo={featureInfo}
                      setFeatureInfo={setFeatureInfo}
                      featureID={featureID}
                    />
                  ))}
                </div>
                <div className="three columns">
                  <DeleteFeature featureID={featureID} />
                </div>
              </div>
              {isEmpty && tests.length === 0 && <AddTestsCTA />}
              {tests.length > 0 && (
                <table className="u-full-width">
                  <thead>
                    <tr>
                      <th>Test case ID</th>
                      <th>Scenario</th>
                      <th>Last execution date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests.map((test, i) => (
                      <Testcases
                        key={i}
                        testcaseIndex={i}
                        test={test}
                        setTestcases={setTestcases}
                        tests={tests}
                        featureID={featureID}
                      />
                    ))}
                  </tbody>
                </table>
              )}
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

export default FeatureTests;
