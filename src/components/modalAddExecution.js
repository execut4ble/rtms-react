import React, { useState, useEffect, useRef } from "react";
import apiclient from "../apiclient";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FeatureListOptions from "../components/featureOptionsList.js";

function AddExecution({ executions, setExecutions }) {
  const [features, setFeatures] = useState([]);
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
    apiclient.get("/features").then((response) => {
      const data = response.data;
      setFeatures([features, ...data]);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [newExecutionName, setNewExecution] = useState("a new execution...");
  const [newSlug, setNewSlug] = useState("slug");
  const [newActiveState, setActive] = useState(false);
  const [newAuthor, setNewAuthor] = useState("1");
  const [selectedFeature, setSelectedFeature] = useState("");

  const addExecution = (event) => {
    event.preventDefault();
    const executionObject = {
      name: newExecutionName,
      slug: newSlug,
      is_active: newActiveState,
      created_by: newAuthor,
      feature: selectedFeature,
    };

    apiclient.post("/runs", executionObject).then((response) => {
      setExecutions(
        executions.concat({
          ...response.data,
          name: executionObject.name,
          testcase_count: response.data.testcase_count,
          tbd: response.data.testcase_count,
          passed: "0",
          failed: "0",
        })
      );
      console.log(response);
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

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleSelectedFeature = (event) => {
    setSelectedFeature(event.target.value);
  };

  return (
    <div>
      <button className="crud" type="button" onClick={handleOpen}>
        <i class="fas fa-plus"></i> New test execution
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
            <h2 id="transition-modal-title">Add new test execution</h2>
            <div id="transition-modal-description">
              <form onSubmit={addExecution}>
                <div class="row">
                  <div class="six columns">
                    <label htmlFor="author">Author</label>
                    <input
                      value={newAuthor}
                      type="text"
                      id="author"
                      onChange={handleAuthorChange}
                      disabled
                    ></input>
                  </div>
                  <div class="six columns">
                    <label htmlFor="slug">Slug</label>
                    <input
                      class="u-full-width"
                      type="text"
                      id="slug"
                      onChange={handleSlugChange}
                    ></input>
                  </div>
                </div>
                <div class="full-width">
                  <label htmlFor="executionTitle">Title</label>
                  <input
                    class="u-full-width"
                    type="text"
                    id="executionTitle"
                    onChange={handleExecutionChange}
                  ></input>
                </div>
                <div class="row">
                  <label htmlFor="featureSelect">Features to test</label>
                  <select
                    class="u-full-width"
                    id="featureSelect"
                    onChange={handleSelectedFeature}
                  >
                    {features.map((feature, i) => (
                      <FeatureListOptions key={i} feature={feature} />
                    ))}
                  </select>
                  <i class="fas fa-plus"></i>
                </div>
                <div class="row">
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
                  class="button-primary"
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

export default AddExecution;
