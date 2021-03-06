import React, { useState, useEffect, useRef } from "react";
import apiclient from "../apiclient";
import FeatureList from "../components/features/featureList";
import LoadingSpinner from "../components/loadingSpinner";
import AddFeature from "../components/features/modalAddFeature";
import useToken from "../components/useToken";

function Features() {
  const { token } = useToken();
  const [features, setFeatures] = useState([]);
  const [isEmpty, setEmpty] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const page = 2;
  const ref = useRef(page);

  const loopFeatures = () => {
    apiclient(token)
      .get("/features")
      .then((response) => {
        const data = response.data;
        setLoading(false);
        setEmpty(data.length < 30);
        setFeatures([...features, ...data]);
      });
  };

  useEffect(() => {
    loopFeatures(1, page);
  }, []);

  const handleShowMoreFeatures = () => {
    loopFeatures(ref.current, ref.current + page);
    setLoading(true);
    ref.current += 1;
  };

  return (
    <div className="section features" id="feed">
      <div className="container">
        <p className="feed-description"></p>
        <div className="row">
          <div className="twelve columns">
            <h3 className="section-heading">Features</h3>
            <AddFeature features={features} setFeatures={setFeatures} />
            {isLoading && features.length === 0 && <LoadingSpinner />}
            {(!isLoading || features.length > 0) && (
              <table className="u-full-width">
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Sprint</th>
                    <th>Title</th>
                    <th>Test cases</th>
                    <th>Defects</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, i) => (
                    <FeatureList key={i} feature={feature} />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {!isEmpty && !isLoading && (
          <div
            className="button button-primary"
            onClick={handleShowMoreFeatures}
          >
            Load more
          </div>
        )}
        {isLoading && features.length > 0 && <LoadingSpinner />}
      </div>
    </div>
  );
}

export default Features;
