import React from "react";
import apiclient from "../../apiclient";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import useToken from "../useToken";
import { toast } from "react-toastify";

function DeleteTestcase({
  featureID,
  testcaseID,
  tests,
  setTestcases,
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

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { token } = useToken();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTestcase = (event) => {
    event.preventDefault();

    apiclient(token)
      .delete("/testcases/" + featureID + "/" + testcaseID)
      .then((response) => {
        tests.splice(testcaseIndex, 1);
        setTestcases([...tests]);
        toast.success("Testcase removed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error("An error occured!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="six columns">
      <button
        className="crud"
        type="button"
        id="deleteTestcase"
        onClick={handleOpen}
      >
        <i className="fas fa-trash-alt"></i>
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
            <h2 id="transition-modal-title">
              Are you sure you want to remove this testcase?
            </h2>
            <div id="transition-modal-description">
              {" "}
              Testcase will be removed and will disappear from all execution
              instances.
              <form onSubmit={deleteTestcase}>
                <input
                  className="button-primary"
                  type="submit"
                  value="Remove"
                  onClick={handleClose}
                ></input>
                <input
                  className="button-delete"
                  type="button"
                  value="Cancel"
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

export default DeleteTestcase;
