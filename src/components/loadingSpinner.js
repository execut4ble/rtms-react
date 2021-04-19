import React from "react";

const LoadingSpinner = () => {
  return (
    <center>
      <svg className="spinner" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20"></circle>
      </svg>
    </center>
  );
};

export default LoadingSpinner;
