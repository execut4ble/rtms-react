import React, { useState } from "react";
import apiclient from "../../apiclient";
import useToken from "../useToken";

function WatchButton({ execution, executionID }) {
  const { token } = useToken();
  const [watchState, setWatchState] = useState(execution.watched);

  const handleWatch = (event) => {
    event.preventDefault();

    apiclient(token)
      .post("/watched/" + executionID)
      .then((response) => {
        setWatchState(true);
        console.log(response);
      });
  };

  const handleUnwatch = (event) => {
    event.preventDefault();

    apiclient(token)
      .delete("/watched/" + executionID)
      .then((response) => {
        setWatchState(false);
        console.log(response);
      });
  };

  if (!watchState) {
    return (
      <div>
        <button className="crud" type="button" id="watch" onClick={handleWatch}>
          <i className="fas fa-eye"></i> Watch
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          className="crud"
          type="button"
          id="unwatch"
          onClick={handleUnwatch}
        >
          <i className="fas fa-eye-slash"></i> Unwatch
        </button>
      </div>
    );
  }
}

export default WatchButton;
