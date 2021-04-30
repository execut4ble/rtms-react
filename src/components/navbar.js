import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiclient from "../apiclient";
import useToken from "./useToken";

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
              <i className="fas fa-user-circle"></i> {user.username}{" "}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
