import React, { Component } from "react";
import { Jumbotron, Button } from "reactstrap";
import Teammembers from "../teamlead_dashboard/Teammembers";

export default class componentName extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">Porject Name </h1>
          <p className="lead">Project information</p>
          <hr className="my-2" />
          <Teammembers />
        </Jumbotron>
      </div>
    );
  }
}
