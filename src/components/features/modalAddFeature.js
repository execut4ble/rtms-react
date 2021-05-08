import React, { useState } from "react";
import apiclient from "../../apiclient";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import useToken from "../useToken";

function AddFeature({ features, setFeatures }) {
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

  const [newFeatureName, setNewFeature] = useState("a new feature...");
  const [newDescription, setNewDescription] = useState("");
  const [newTicket, setNewTicket] = useState("TICKET-ID");
  const [newSprint, setNewSprint] = useState("Sprint");
  const [newSlug, setNewSlug] = useState("");
  const [newAuthor, setNewAuthor] = useState(
    sessionStorage.getItem("username")
  );

  const addFeature = (event) => {
    event.preventDefault();
    const featureObject = {
      name: newFeatureName,
      ticket: newTicket,
      sprint: newSprint,
      description: newDescription,
      slug: newSlug,
    };

    apiclient(token)
      .post("/features", featureObject)
      .then((response) => {
        setFeatures(
          features.concat({
            ...response.data,
            testcases: "0",
            defects: "0",
          })
        );
        console.log(response);
      });

    handleClose();
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

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  return (
    <div>
      <button className="crud" type="button" onClick={handleOpen}>
        <i className="fas fa-plus"></i> Add feature
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
            <h2 id="transition-modal-title">Add new feature</h2>
            <div id="transition-modal-description">
              <form onSubmit={addFeature}>
                <div className="row">
                  <div className="four columns">
                    <label htmlFor="ticket">Ticket ID</label>
                    <input
                      className="u-full-width"
                      type="text"
                      id="ticket"
                      onChange={handleTicketChange}
                      required
                    ></input>
                  </div>
                  <div className="four columns">
                    <label htmlFor="sprint">Sprint</label>
                    <input
                      className="u-full-width"
                      type="text"
                      placeholder="i.e. Sprint 4"
                      id="sprint"
                      onChange={handleSprintChange}
                      required
                    ></input>
                  </div>
                  <div className="four columns">
                    <label htmlFor="slug">Slug</label>
                    <input
                      className="u-full-width"
                      type="text"
                      id="slug"
                      onChange={handleSlugChange}
                      required
                    ></input>
                  </div>
                </div>
                <div className="full-width">
                  <label htmlFor="featureTitle">Title</label>
                  <input
                    className="u-full-width"
                    type="text"
                    id="featureTitle"
                    onChange={handleFeatureChange}
                    required
                  ></input>
                </div>
                <label htmlFor="description">Description</label>
                <textarea
                  className="u-full-width"
                  placeholder="Describe the testing to be done with this feature"
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
                ></input>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddFeature;
