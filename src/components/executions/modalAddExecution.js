import React, { useState, useEffect, useRef } from "react";
import apiclient from "../../apiclient";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FeatureListOptions from "../features/featureOptionsList.js";
import useToken from "../useToken";

function AddExecution({ executions, setExecutions }) {
  const { token, setToken } = useToken();
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
    apiclient()
      .get("/features")
      .then((response) => {
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
  const [newAuthor, setNewAuthor] = useState(
    sessionStorage.getItem("username")
  );
  const [selectedFeatures, setSelectedFeatures] = useState([""]);

  const addExecution = (event) => {
    event.preventDefault();
    const executionObject = {
      name: newExecutionName,
      slug: newSlug,
      is_active: newActiveState,
      created_by: newAuthor,
      feature: selectedFeatures,
    };

    apiclient(token)
      .post("/runs", executionObject)
      .then((response) => {
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

  const handleAddBulk = () => {
    setSelectedFeatures(selectedFeatures.concat(""));
  };

  const handleRemoveFromBulk = () => {
    setSelectedFeatures(selectedFeatures.slice(1));
  };

  const handleSelectFeature = (event, index) => {
    console.log(event);
    selectedFeatures[index] = event.target.value;
    setSelectedFeatures([...selectedFeatures]);
  };

  return (
    <div>
      <button className="crud" type="button" onClick={handleOpen}>
        <i className="fas fa-plus"></i> New test execution
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
                <div className="row">
                  <div className="six columns">
                    <label htmlFor="author">Author</label>
                    <input
                      value={newAuthor}
                      type="text"
                      id="author"
                      onChange={handleAuthorChange}
                      disabled
                    ></input>
                  </div>
                  <div className="six columns">
                    <label htmlFor="slug">Slug</label>
                    <input
                      className="u-full-width"
                      type="text"
                      id="slug"
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
                    onChange={handleExecutionChange}
                  ></input>
                </div>
                <div className="row">
                  <label htmlFor="featureSelect">Features to test</label>
                  {selectedFeatures.map((select, i) => (
                    <div className="row" key={i}>
                      <select
                        className="u-full-width"
                        id="featureSelect"
                        onChange={(e) => handleSelectFeature(e, i)}
                      >
                        {features.map((feature, index) => (
                          <FeatureListOptions key={index} feature={feature} />
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
                <div className="row">
                  <div className="two columns">
                    <button
                      className="crud"
                      type="button"
                      onClick={handleAddBulk}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  <div className="two columns">
                    <button
                      className="crud"
                      type="button"
                      onClick={handleRemoveFromBulk}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
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
