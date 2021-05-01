import React from "react";

const FeatureOptionsList = ({ feature }) => {
  return (
    <option value={feature.id} name={feature.name}>
      {feature.name}
    </option>
  );
};

export default FeatureOptionsList;
