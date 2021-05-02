import React, { useState } from "react";
import apiclient from "../../apiclient";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import useToken from "../useToken";

function EditTestcase({
  tests,
  testcaseID,
  testScenario,
  testDescription,
  setTestcases,
  featureID,
  testcaseIndex,
}) {
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

  const { token } = useToken();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [newTestcaseScenario, setNewTestcase] = useState(testScenario);
  const [newDescription, setNewDescription] = useState(testDescription);

  const editTestcase = (event) => {
    event.preventDefault();
    const testcaseObject = {
      scenario: newTestcaseScenario,
      description: newDescription,
      id: testcaseID,
    };

    apiclient(token)
      .put("/testcases/" + featureID + "/" + testcaseID, testcaseObject)
      .then((response) => {
        tests[testcaseIndex] = response.data;
        setTestcases([...tests]);
        console.log(tests[testcaseIndex]);
      });

    handleClose();
  };

  const handleTestcaseChange = (event) => {
    setNewTestcase(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  return (
    <div>
      <button className="crud" type="button" onClick={handleOpen}>
        <i className="fas fa-pencil-alt"></i>
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
            <h2 id="transition-modal-title">Edit testcase</h2>
            <div id="transition-modal-description">
              <form onSubmit={editTestcase}>
                <div className="full-width">
                  <label htmlFor="testcaseScenario">Scenario</label>
                  <input
                    className="u-full-width"
                    type="text"
                    id="testcaseScenario"
                    value={newTestcaseScenario}
                    onChange={handleTestcaseChange}
                    required
                  ></input>
                </div>
                <label htmlFor="description">Description</label>
                <textarea
                  className="u-full-width"
                  placeholder="Describe testcase steps"
                  id="description"
                  value={newDescription}
                  onChange={handleDescriptionChange}
                ></textarea>
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

export default EditTestcase;
