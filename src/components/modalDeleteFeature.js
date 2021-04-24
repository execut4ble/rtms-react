import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import apiclient from "../apiclient";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

function DeleteFeature({ featureID }) {
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteFeature = (event) => {
    event.preventDefault();

    apiclient.delete("/features/" + featureID).then((response) => {
      console.log(response);

      history.push("/features");
    });
  };

  return (
    <div>
      <button className="crud" type="button" onClick={handleOpen}>
        <i className="fas fa-trash-alt"></i> Remove feature
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
              Are you sure you want to remove this feature?
            </h2>
            <div id="transition-modal-description">
              {" "}
              Feature will be removed along with all it's testcases, including
              testcases in executions.
              <form onSubmit={deleteFeature}>
                <input
                  className="button-primary"
                  type="submit"
                  value="Remove"
                  onClick={handleClose}
                ></input>
                <input
                  className="button-delete"
                  type="button"
                  value="Cancel"
                  onClick={handleClose}
                ></input>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default DeleteFeature;
