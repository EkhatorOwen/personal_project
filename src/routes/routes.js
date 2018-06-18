import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "../components/landingPage/Homepage";
import Step1 from "../components/teamlead_setup/Step1";
import Setup from "../components/teamlead_setup/Setup";
import Dashboard from "../components/teamlead_dashboard/Dashboard";

export default (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route path="/setup" component={Setup} />
    <Route path="/dashboard" component={Dashboard} />
   
  </Switch>
);
