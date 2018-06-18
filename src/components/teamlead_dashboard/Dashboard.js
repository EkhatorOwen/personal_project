import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { Alert } from "reactstrap";
import Header from "./Header";
import axios from "axios";
import ViewProject from "./ViewProject";
import Profile from "./Profile";
import AddProject from "./AddProject";
import EditProfile from "./EditProfile";
import Project from './Project'
import ManagePeople from './ManagePeople'
import Calender from './Calender'


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
          <Route  component={Project} exact path="/dashboard/project/:id"/>
          <Route component={ManagePeople} exact path="/dashboard/project/:id/people"/>
          <Route component={Calender} exact path="/dashboard/project/:id/schedule"/>
          </Switch>
      </Fragment>
    );
  }
}
