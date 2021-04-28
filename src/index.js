import React, { useState } from "react";
import ReactDOM from "react-dom";
import Home from "./pages/home.page";
import Executions from "./pages/executions.page";
import Info from "./pages/info.page";
import Features from "./pages/features.page";
import PageNotFound from "./pages/404.page";
import FeatureTests from "./pages/testcases.page";
import ExecuteTests from "./pages/executeTests.page";
import Login from "./components/login";
import useToken from "./components/useToken";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

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
              <i className="fas fa-user-circle"></i> username{" "}
            </div>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/features" component={Features} />
        <Route exact path="/features/:id" component={FeatureTests} />
        <Route exact path="/executions" component={Executions} />
        <Route exact path="/executions/:id" component={ExecuteTests} />
        <Route exact path="/info" component={Info} />
        <Route exact path="/" component={Home} />
        <Route render={() => <PageNotFound />} />
      </Switch>
    </div>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
