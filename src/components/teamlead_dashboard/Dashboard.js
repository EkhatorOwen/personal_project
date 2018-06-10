import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { Alert } from "reactstrap";
import Header from "./Header";
import axios from "axios";
import ViewProject from "./ViewProject";
import Profile from "./Profile";
import AddProject from "./AddProject";
import EditProfile from "./EditProfile";

export default class Dashboard extends Component {
  // componentDidMount() {
  //   axios.get("api/projects");
  // }
  render() {
    return (
      <Fragment>
        <Header />
        <div style={{ marginTop: "10px" }} />

        <Switch>
          <Route component={AddProject} path="/dashboard/addproject" />
          <Route component={ViewProject} exact path="/dashboard/viewproject" />
          <Route component={Profile} path="/dashboard/profile" />
          <Route component={EditProfile} path="/dashboard/editprofile" />
        </Switch>
      </Fragment>
    );
  }
}
