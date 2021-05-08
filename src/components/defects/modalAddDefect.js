import React, { useState } from "react";
import apiclient from "../../apiclient";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import useToken from "../useToken";
import FeatureListOptions from "../features/featureOptionsList";

function AddDefect({ defects, setDefects }) {
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
  const [features, setFeatures] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    apiclient(token)
      .get("/features")
      .then((response) => {
        const data = response.data;
        setFeatures([features, ...data]);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [newDefectName, setNewDefect] = useState("a new defect...");
  const [newDescription, setNewDescription] = useState("");
  const [newTicket, setNewTicket] = useState("TICKET-ID");
  const [newPriority, setNewPriority] = useState("minor");
  const [selectedFeature, setSelectedFeature] = useState("");
  const [newFeatureName, setFeatureName] = useState("");
  const [newActiveState] = useState(true);
  const [newAuthor, setNewAuthor] = useState(
    sessionStorage.getItem("username")
  );

  const addDefect = (event) => {
    event.preventDefault();
    const defectObject = {
      name: newDefectName,
      ticket: newTicket,
      priority: newPriority,
      description: newDescription,
      feature: selectedFeature,
      is_active: newActiveState,
    };

    apiclient(token)
      .post("/defects", defectObject)
      .then((response) => {
        setDefects(
          defects.concat({
            ...response.data,
            feature_name: newFeatureName,
          })
        );
        console.log(response);
      });

    handleClose();
  };

  const handleDefectChange = (event) => {
    setNewDefect(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleSelectPriority = (event) => {
    setNewPriority(event.target.value);
  };

  const handleTicketChange = (event) => {
    setNewTicket(event.target.value);
  };

  const handleSelectFeature = (event) => {
    setSelectedFeature(event.target.value);
    setFeatureName(
      event.target[event.target.selectedIndex].getAttribute("name")
    );
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  return (
    <div>
      <button className="crud" type="button" id="create" onClick={handleOpen}>
        <i className="fas fa-plus"></i> Add new defect
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
            <h2 id="transition-modal-title">Add new defect</h2>
            <div id="transition-modal-description">
              <form onSubmit={addDefect}>
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
                    <label htmlFor="priority">Priority</label>
                    <select
                      className="u-full-width"
                      defaultValue="minor"
                      id="priority"
                      onChange={handleSelectPriority}
                      required
                    >
                      <option value="minor">Minor</option>
                      <option value="major">Major</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div className="four columns">
                    <label htmlFor="feature">Feature</label>
                    <div className="row">
                      <select
                        className="u-full-width"
                        id="featureSelect"
                        onChange={(e) => handleSelectFeature(e)}
                        required
                      >
                        {features.map((feature, i) => (
                          <FeatureListOptions key={i} feature={feature} />
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="full-width">
                  <label htmlFor="defectTitle">Title</label>
                  <input
                    className="u-full-width"
                    type="text"
                    id="defectTitle"
                    onChange={handleDefectChange}
                    required
                  ></input>
                </div>
                <label htmlFor="description">Description</label>
                <textarea
                  className="u-full-width"
                  placeholder="Steps to reproduce the bug"
                  id="description"
                  onChange={handleDescriptionChange}
                  required
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

export default AddDefect;
