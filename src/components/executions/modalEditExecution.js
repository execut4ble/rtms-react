import React, { useState } from "react";
import apiclient from "../../apiclient";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import useToken from "../useToken";
import { toast } from "react-toastify";

function EditExecution({
  execution,
  executionInfo,
  setExecutionInfo,
  executionID,
  executionIndex,
}) {
  const { token } = useToken();
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

  const [newExecutionName, setNewExecution] = useState(execution.name);
  const [newSlug, setNewSlug] = useState(execution.slug);
  const [newActiveState, setActive] = useState(execution.is_active);
  const [newAuthor] = useState(sessionStorage.getItem("username"));

  const editExecution = (event) => {
    event.preventDefault();
    const executionObject = {
      name: newExecutionName,
      slug: newSlug,
      is_active: newActiveState,
      id: executionID,
    };

    apiclient(token)
      .put("/runs/" + executionID, executionObject)
      .then((response) => {
        executionInfo[executionIndex] = response.data;
        setExecutionInfo([
          {
            ...executionInfo[executionIndex],
            modified_user: newAuthor,
            created_user: execution.created_user,
          },
        ]);
        toast.info("Execution updated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        handleClose();
      })
      .catch((error) => {
        if (error.response.status === 409) {
          toast.error("Execution already exists!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("An error occured!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  const handleExecutionChange = (event) => {
    setNewExecution(event.target.value);
  };

  const handleActiveStateChange = (event) => {
    setActive(event.target.checked);
    console.log(newActiveState);
  };

  const handleSlugChange = (event) => {
    setNewSlug(event.target.value);
  };

  return (
    <div>
      <button className="crud" type="button" id="edit" onClick={handleOpen}>
        <i className="fas fa-pencil-alt"></i> Edit test execution
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
            <h2 id="transition-modal-title">Edit test execution</h2>
            <div id="transition-modal-description">
              <form onSubmit={editExecution}>
                <div className="row">
                  <div className="full-width">
                    <label htmlFor="slug">Slug</label>
                    <input
                      className="u-full-width"
                      type="text"
                      id="slug"
                      value={newSlug}
                      onChange={handleSlugChange}
                    ></input>
                  </div>
                </div>
                <div className="full-width">
                  <label htmlFor="executionTitle">Title</label>
                  <input
                    className="u-full-width"
                    type="text"
                    id="executionTitle"
                    value={newExecutionName}
                    onChange={handleExecutionChange}
                  ></input>
                </div>
                <div className="row">
                  <input
                    type="checkbox"
                    checked={newActiveState}
                    id="isActive"
                    onChange={handleActiveStateChange}
                  ></input>
                  <label htmlFor="isActive" className="activeChkBox">
                    Set as active
                  </label>
                </div>
                <input
                  className="button-primary"
                  type="submit"
                  value="Submit"
                ></input>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default EditExecution;
