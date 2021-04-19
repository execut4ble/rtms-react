import React, { useState, useEffect } from "react";
import apiclient from "../apiclient";
import Testcases from "../components/testcases";
import FeatureInfo from "../components/featureInfo";

function FeatureTests(props) {
  const featureID = props.match.params.id;
  const [tests, setTestcases] = useState([]);
  const [featureInfo, setFeatureInfo] = useState([]);

  useEffect(() => {
    apiclient.get("/features/" + featureID).then((response) => {
      setFeatureInfo(response.data);
    });
  }, [featureID]);

  useEffect(() => {
    apiclient.get("/testcases/" + featureID).then((response) => {
      setTestcases(response.data);
    });
  }, [featureID]);

  return (
    <div className="feature-testcases">
      <div class="section livefeed" id="feed">
        <div class="container">
          <div class="row">
            <div class="twelve columns">
              {featureInfo.map((feature, i) => (
                <FeatureInfo key={i} feature={feature} />
              ))}

              <table class="u-full-width">
                <thead>
                  <tr>
                    <th>Test case ID</th>
                    <th>Scenario</th>
                    <th>Last execution date</th>
                    <th>Last execution status</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((test, i) => (
                    <Testcases key={i} test={test} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* <a class="button button-primary" href="#browse">
            Load more
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default FeatureTests;
