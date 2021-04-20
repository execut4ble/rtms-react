import React, { useState, useEffect, useRef } from "react";
import apiclient from "../apiclient";
import FeatureList from "../components/featureList";
import LoadingSpinner from "../components/loadingSpinner";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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

function Features() {
  const [features, setFeatures] = useState([]);
  const [isEmpty, setEmpty] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const page = 2;
  const ref = useRef(page);

  const loopFeatures = () => {
    apiclient.get("/features").then((response) => {
      const data = response.data;
      setLoading(false);
      setEmpty(data.length < 30);
      setFeatures([...features, ...data]);
    });
  };

  useEffect(() => {
    loopFeatures(1, page);
  }, []);

  const handleShowMoreFeatures = () => {
    loopFeatures(ref.current, ref.current + page);
    setLoading(true);
    ref.current += 1;
  };

  const [newFeatureName, setNewFeature] = useState("a new feature...");
  const [newDescription, setNewDescription] = useState("desc");
  const [newTicket, setNewTicket] = useState("ticket");
  const [newSprint, setNewSprint] = useState("sprint");
  const [newSlug, setNewSlug] = useState("slug");
  const [newAuthor, setNewAuthor] = useState("author");

  const addFeature = (event) => {
    event.preventDefault();
    const featureObject = {
      name: newFeatureName,
      ticket: newTicket,
      sprint: newSprint,
      description: newDescription,
      slug: newSlug,
      created_by: newAuthor,
    };

    setFeatures(features.concat(featureObject));
    apiclient.post("/features", featureObject).then((response) => {
      console.log(response);
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

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  return (
    <div className="section features" id="feed">
      <div className="container">
        <p className="feed-description"></p>
        <div className="row">
          <div className="twelve columns">
            <h3 className="section-heading">Features</h3>
            <div>
              <button
                className="button button-primary"
                type="button"
                onClick={handleOpen}
              >
                Add feature
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
                    <h2 id="transition-modal-title">Add feature</h2>
                    <p id="transition-modal-description">
                      <form onSubmit={addFeature}>
                        <label>
                          Name:{" "}
                          <input
                            value={newFeatureName}
                            onChange={handleFeatureChange}
                          ></input>
                        </label>
                        <label>
                          Description:{" "}
                          <input
                            value={newDescription}
                            onChange={handleDescriptionChange}
                          ></input>
                        </label>
                        <label>
                          Sprint:{" "}
                          <input
                            value={newSprint}
                            onChange={handleSprintChange}
                          ></input>
                        </label>
                        <label>
                          Ticket ID:{" "}
                          <input
                            value={newTicket}
                            onChange={handleTicketChange}
                          ></input>
                        </label>
                        <label>
                          Slug:{" "}
                          <input
                            value={newSlug}
                            onChange={handleSlugChange}
                          ></input>
                        </label>
                        <label>
                          Author ID:{" "}
                          <input
                            value={newAuthor}
                            onChange={handleAuthorChange}
                          ></input>
                        </label>
                        <button
                          className="button button-primary"
                          type="submit"
                          onClick={handleClose}
                        >
                          Add
                        </button>
                      </form>
                    </p>
                  </div>
                </Fade>
              </Modal>
            </div>

            {isLoading && features.length === 0 && <LoadingSpinner />}
            {(!isLoading || features.length > 0) && (
              <table className="u-full-width">
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Sprint</th>
                    <th>Title</th>
                    <th>Test cases</th>
                    <th>Defects</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, i) => (
                    <FeatureList key={i} feature={feature} />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {!isEmpty && !isLoading && (
          <div
            className="button button-primary"
            onClick={handleShowMoreFeatures}
          >
            Load more
          </div>
        )}
        {isLoading && features.length > 0 && <LoadingSpinner />}
      </div>
    </div>
  );
}

export default Features;
