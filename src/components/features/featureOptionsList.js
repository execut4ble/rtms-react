import React from "react";

const FeatureOptionsList = ({ feature }) => {
  return <option value={feature.id}>{feature.name}</option>;
};

export default FeatureOptionsList;
