import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiclient from "../apiclient";
import useToken from "./useToken";
import { Menu, MenuItem, Fade } from "@material-ui/core";

const Navbar = () => {
  const [user, setUser] = useState([]);
  const { token } = useToken();

  useEffect(() => {
    apiclient(token)
      .get("/users/verify")
      .then((response) => {
        sessionStorage.setItem("username", response.data.username);
        setUser(response.data);
      });
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    window.location.reload();
  };

  return (
    <div>
      <nav id="nav">
        <ul>
          <li>
            <Link to="/">
              <i className="fas fa-home"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/features">
              <i className="fas fa-book"></i> Features
            </Link>
          </li>
          <li>
            <Link to="/executions">
              <i className="fas fa-vial"></i> Test Executions
            </Link>
          </li>
          <li>
            <Link to="/info">
              <i className="fas fa-question-circle"></i> Info
            </Link>
          </li>
          <li>
            <div className="userInfo">
              <button className="crud" onClick={handleClick}>
                <i className="fas fa-user-circle"></i> {user.username}{" "}
              </button>
              <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuItem onClick={handleClose}>Preferences</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
