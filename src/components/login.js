import React, { useState } from "react";
import apiclient from "../apiclient";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  return apiclient
    .post("/login", JSON.stringify(credentials))
    .then((response) => response.data);
}

function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  return (
    <div className="section" id="login">
      <div className="container">
        <div className="twelve columns">
          <h3 className="section-heading">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="six columns">
                <label htmlFor="exampleEmailInput">Your email</label>
                <input
                  className="u-full-width"
                  type="email"
                  placeholder="test@mailbox.com"
                  id="exampleEmailInput"
                  onChange={(e) => setUserName(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="six columns">
                <label htmlFor="password">Password</label>
                <input
                  className="u-full-width"
                  type="password"
                  placeholder=""
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
            </div>
            <input
              className="button-primary"
              type="submit"
              value="Submit"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;