import React, { useState, useEffect, useRef } from "react";
import apiclient from "../../apiclient";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

function EditFeature({
  feature,
  featureInfo,
  setFeatureInfo,
  featureID,
  featureIndex,
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

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [newFeatureName, setNewFeature] = useState(feature.name);
  const [newDescription, setNewDescription] = useState(feature.description);
  const [newTicket, setNewTicket] = useState(feature.ticket);
  const [newSprint, setNewSprint] = useState(feature.sprint);
  const [newSlug, setNewSlug] = useState(feature.slug);
  const [newAuthor, setNewAuthor] = useState("2");

  const editFeature = (event) => {
    event.preventDefault();
    const featureObject = {
      name: newFeatureName,
      ticket: newTicket,
      sprint: newSprint,
      description: newDescription,
      slug: newSlug,
      last_modified_by: newAuthor,
      id: featureID,
    };

    apiclient.put("/features/" + featureID, featureObject).then((response) => {
      featureInfo[featureIndex] = response.data;
      setFeatureInfo([...featureInfo]);
      console.log(featureInfo);
    });
  };

  const handleFeatureChange = (event) => {
    setNewFeature(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleSprintChange = (event) => {
    setNewSprint(event.target.value);
  };

  const handleTicketChange = (event) => {
    setNewTicket(event.target.value);
  };

  const handleSlugChange = (event) => {
    setNewSlug(event.target.value);
  };

  return (
    <div>
      <button className="crud" type="button" onClick={handleOpen}>
        <i className="fas fa-pencil-alt"></i> Edit feature
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
            <h2 id="transition-modal-title">Edit feature</h2>
            <div id="transition-modal-description">
              <form onSubmit={editFeature}>
                <div className="row">
                  <div className="four columns">
                    <label htmlFor="ticket">Ticket ID</label>
                    <input
                      className="u-full-width"
                      type="text"
                      id="ticket"
                      value={newTicket}
                      onChange={handleTicketChange}
                    ></input>
                  </div>
                  <div className="four columns">
                    <label htmlFor="sprint">Sprint</label>
                    <input
                      className="u-full-width"
                      type="text"
                      placeholder="i.e. Sprint 4"
                      id="sprint"
                      value={newSprint}
                      onChange={handleSprintChange}
                    ></input>
                  </div>
                  <div className="four columns">
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
                  <label htmlFor="featureTitle">Title</label>
                  <input
                    className="u-full-width"
                    type="text"
                    id="featureTitle"
                    value={newFeatureName}
                    onChange={handleFeatureChange}
                  ></input>
                </div>
                <label htmlFor="description">Description</label>
                <textarea
                  className="u-full-width"
                  placeholder="Describe the testing to be done with this feature"
                  id="description"
                  value={newDescription}
                  onChange={handleDescriptionChange}
                ></textarea>
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

export default EditFeature;
