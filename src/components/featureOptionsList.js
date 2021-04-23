import React from "react";
import { Link } from "react-router-dom";

const FeatureOptionsList = ({ feature }) => {
  return <option value={feature.id}>{feature.name}</option>;
};

export default FeatureOptionsList;
