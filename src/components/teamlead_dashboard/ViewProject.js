import React, { Component, Fragment } from "react";
import axios from "axios";

export default class ViewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    axios.get("/api/projects").then(project => {
      console.log(project);
      this.setState({
        projects: project
      });
    });
  }

  render() {
    let proj = this.state.projects;

    return (
      <div className="view-project">
        {proj.length == 0 && (
          <p>
            You have no projects, click the <b>Add Project </b>
            link on the header to add a new project
          </p>
        )}
      </div>
    );
  }
}
