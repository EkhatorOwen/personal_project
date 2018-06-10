import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Step1 from "./Step1";
import Step2 from "./Step2";

export default class Setup extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="setup_wizard">
          <h1>Set up your account</h1>
        </div>

        <Switch>
          <Route exact path="/setup/step1" component={Step1} />
          <Route path="/setup/step2" component={Step2} />
        </Switch>
      </div>
    );
  }
}
