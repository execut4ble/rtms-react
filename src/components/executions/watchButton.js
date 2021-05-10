import React, { useState } from "react";
import apiclient from "../../apiclient";
import useToken from "../useToken";
import { toast } from "react-toastify";

function WatchButton({ execution, executionID }) {
  const { token } = useToken();
  const [watchState, setWatchState] = useState(execution.watched);

  const handleWatch = (event) => {
    event.preventDefault();

    apiclient(token)
      .post("/watched/" + executionID)
      .then((response) => {
        setWatchState(true);
        toast.info(`Started watching ${execution.name}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const handleUnwatch = (event) => {
    event.preventDefault();

    apiclient(token)
      .delete("/watched/" + executionID)
      .then((response) => {
        setWatchState(false);
        toast.info(`Stopped watching ${execution.name}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
