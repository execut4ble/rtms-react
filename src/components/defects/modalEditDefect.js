import React, { useState } from "react";
import apiclient from "../../apiclient";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import useToken from "../useToken";
import FeatureListOptions from "../features/featureOptionsList";

function EditDefect({
  defect,
  defectInfo,
  setDefectInfo,
  defectID,
  defectIndex,
  features,
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

  const [newDefectName, setNewDefect] = useState(defect.name);
  const [newDescription, setNewDescription] = useState(defect.description);
  const [newTicket, setNewTicket] = useState(defect.ticket);
  const [newPriority, setNewPriority] = useState(defect.priority);
  const [selectedFeature, setSelectedFeature] = useState(defect.feature);
  const [newActiveState] = useState(defect.is_active);
  const [newAuthor] = useState(sessionStorage.getItem("username"));

  const editDefect = (event) => {
    event.preventDefault();
    const defectObject = {
      name: newDefectName,
      ticket: newTicket,
      priority: newPriority,
      description: newDescription,
      feature: selectedFeature,
      is_active: newActiveState,
      id: defectID,
    };

    apiclient(token)
      .put("/defects/" + defectID, defectObject)
      .then((response) => {
        defectInfo[defectIndex] = response.data;
        setDefectInfo([
          {
            ...defectInfo[defectIndex],
            modified_user: newAuthor,
            created_user: defect.created_user,
          },
        ]);
        console.log(defectInfo);
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
  };

  return (
    <div>
      <button className="crud" type="button" onClick={handleOpen}>
        <i className="fas fa-pencil-alt"></i> Edit defect
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
            <h2 id="transition-modal-title">Edit defect</h2>
            <div id="transition-modal-description">
              <form onSubmit={editDefect}>
                <div className="row">
                  <div className="four columns">
                    <label htmlFor="ticket">Ticket ID</label>
                    <input
                      className="u-full-width"
                      type="text"
                      id="ticket"
                      value={newTicket}
                      onChange={handleTicketChange}
                      required
                    ></input>
                  </div>
                  <div className="four columns">
                    <label htmlFor="priority">Priority</label>
                    <select
                      className="u-full-width"
                      defaultValue={newPriority}
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
                        defaultValue={selectedFeature}
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
                    value={newDefectName}
                    className="u-full-width"
                    type="text"
                    id="defectTitle"
                    onChange={handleDefectChange}
                    required
                  ></input>
                </div>
                <label htmlFor="description">Description</label>
                <textarea
                  value={newDescription}
                  className="u-full-width"
                  placeholder="Steps to reproduce the bug"
                  id="description"
                  onChange={handleDescriptionChange}
                  required
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

export default EditDefect;
