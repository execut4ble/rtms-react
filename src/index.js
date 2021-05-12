import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/home.page";
import Executions from "./pages/executions.page";
import Features from "./pages/features.page";
import PageNotFound from "./pages/404.page";
import FeatureTests from "./pages/testcases.page";
import ExecuteTests from "./pages/executeTests.page";
import Defects from "./pages/defects.page";
import DefectDetails from "./pages/defectDetails.page";
import Login from "./components/login";
import useToken from "./components/useToken";
import Navbar from "./components/navbar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./pages/users.page";

function App() {
  const { token, setToken } = useToken();

  return (
    <div>
      {!token && <Login setToken={setToken} />}
      {token && (
        <div>
          <ToastContainer />
          <Navbar token={token} />
          <Switch>
            <Route exact path="/features" component={Features} />
            <Route exact path="/features/:id" component={FeatureTests} />
            <Route exact path="/executions" component={Executions} />
            <Route exact path="/executions/:id" component={ExecuteTests} />
            <Route exact path="/defects" component={Defects} />
            <Route exact path="/defects/:id" component={DefectDetails} />
            <Route exact path="/users" component={Users} />
            {/* <Route exact path="/info" component={Info} /> */}
            <Route exact path="/" component={Home} />
            <Route render={() => <PageNotFound />} />
          </Switch>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
