import React, { useState } from "react";
import apiclient from "../../apiclient";
import useToken from "../useToken";
import { toast } from "react-toastify";

function DefectInfo({ defect, defectID, isModified }) {
  const { token } = useToken();
  const [state, setDefectState] = useState(defect.is_active);
  function formatDate(unixTimeStamp) {
    var date = new Date(unixTimeStamp * 1000);

    var dateString = date.toLocaleDateString("en-US", {
      hour12: false,
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    var timeString = date.toLocaleTimeString("en-US", {
      hour12: false,
    });

    return timeString + " on " + dateString;
  }

  const handleExecute = () => {
    var stateToSend = true;

    if (state) {
      setDefectState(false);
      stateToSend = false;
      updateStatus(stateToSend);
    } else if (!state) {
      setDefectState(true);
      stateToSend = true;
      updateStatus(stateToSend);
    }
  };

  function updateStatus(state) {
    apiclient(token)
      .put("/defects/" + defectID + "/setstate", {
        is_active: state,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        toast.error("An error occured!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  function isOpen(object) {
    if (object) {
      return "Open";
    } else {
      return "Closed";
    }
  }

  return (
    <div>
      <h3>
        {defect.name}{" "}
        <button className={`execute ${state}`} onClick={handleExecute}>
          {isOpen(state)}
        </button>
      </h3>

      <p className="feature-description">{defect.description}</p>
      <br />
      <p className="feature-metadata">
        Created by: {defect.created_user} at {formatDate(defect.created_date)}
        <br />
      </p>
      {isModified && (
        <p className="feature-metadata">
          Last edited by: {defect.modified_user} at{" "}
          {formatDate(defect.modified_date)}
        </p>
      )}
    </div>
  );
}

export default DefectInfo;
