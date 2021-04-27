import React, { useState, useEffect, useRef } from "react";
import apiclient from "../../apiclient";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

function AddTestcase({ featureID, tests, setTestcases }) {
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

  const [newTestcaseScenario, setNewTestcase] = useState("new scenario...");
  const [newDescription, setNewDescription] = useState("");
  const [newAuthor, setNewAuthor] = useState("1");

  const addTestcase = (event) => {
    event.preventDefault();
    const testcaseObject = {
      scenario: newTestcaseScenario,
      description: newDescription,
      created_by: newAuthor,
    };

    apiclient
      .post("/testcases/" + featureID + "/", testcaseObject)
      .then((response) => {
        setTestcases(
          tests.concat({
            ...response.data,
            last_execution_date: null,
          })
        );
        console.log(response);
      });
  };

  const handleTestcaseChange = (event) => {
    setNewTestcase(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  return (
    <div>
      <button className="crud" type="button" onClick={handleOpen}>
        <i className="fas fa-plus"></i> Add testcase
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
            <h2 id="transition-modal-title">Add new testcase</h2>
            <div id="transition-modal-description">
              <form onSubmit={addTestcase}>
                <div className="full-width">
                  <label htmlFor="testcaseScenario">Scenario</label>
                  <input
                    className="u-full-width"
                    type="text"
                    id="testcaseScenario"
                    onChange={handleTestcaseChange}
                  ></input>
                </div>
                <label htmlFor="description">Description</label>
                <textarea
                  className="u-full-width"
                  placeholder="Describe testcase steps"
                  id="description"
                  onChange={handleDescriptionChange}
                ></textarea>
                <div className="row">
                  <label htmlFor="author">Author</label>
                  <input
                    value={newAuthor}
                    type="text"
                    id="author"
                    onChange={handleAuthorChange}
                    disabled
                  ></input>
                </div>
                <input
                  className="button-primary"
                  type="submit"
                  value="Submit"
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

export default AddTestcase;
