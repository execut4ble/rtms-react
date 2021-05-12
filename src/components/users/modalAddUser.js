import React, { useState } from "react";
import apiclient from "../../apiclient";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import useToken from "../useToken";
import { toast } from "react-toastify";

function AddUser({ users, setUsers }) {
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

  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newUserRole, setNewRole] = useState("user");
  const [newPassword, setNewPassword] = useState("");

  const addUser = (event) => {
    event.preventDefault();
    const userObject = {
      email: newEmail,
      username: newUsername,
      role: newUserRole,
      password: newPassword,
    };

    apiclient(token)
      .post("/users/register", userObject)
      .then((response) => {
        setUsers(
          users.concat({
            ...response.data,
          })
        );
        toast.success("User registered!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        handleClose();
      })
      .catch((error) => {
        if (error.response.status === 409) {
          toast.error("User already exists!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("An error occured!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleRoleChange = (event) => {
    setNewRole(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  return (
    <div>
      <button className="crud" type="button" id="addUser" onClick={handleOpen}>
        <i className="fas fa-plus"></i> Create new user
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
            <h2 id="transition-modal-title">Add user</h2>
            <div id="transition-modal-description">
              <form onSubmit={addUser}>
                <div className="full-width">
                  <label htmlFor="userEmail">Email</label>
                  <input
                    className="u-full-width"
                    type="email"
                    id="userEmail"
                    value={newEmail}
                    onChange={handleEmailChange}
                    required
                  ></input>
                </div>
                <div className="full-width">
                  <label htmlFor="userName">Username</label>
                  <input
                    className="u-full-width"
                    type="text"
                    id="userName"
                    value={newUsername}
                    onChange={handleUsernameChange}
                    required
                  ></input>
                </div>
                <div className="full-width">
                  <label htmlFor="password">Password</label>
                  <input
                    className="u-full-width"
                    type="password"
                    id="password"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    required
                  ></input>
                </div>
                <label htmlFor="role">Role</label>
                <select
                  className="u-full-width"
                  id="role"
                  value={newUserRole}
                  onChange={handleRoleChange}
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
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

export default AddUser;
