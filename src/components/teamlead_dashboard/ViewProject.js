import React, { Component, Fragment } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import "react-notifications/lib/notifications.css";

export default class ViewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    axios.get("/api/projects").then(project => {
      console.log(project.data);
      this.setState({
        projects: project.data
      });
    });
  }

  render() {
    let proj = this.state.projects;
    console.log(proj);
    let result;
    if (proj.length != 0) {
      result = proj.map((element, index) => {
        return (<ProjectCard key={index} element={element}/>) 
      });
    }

    return (
      <div className="view-project">
        {proj.length == 0 ? (
          <p>
            You have no projects, click the <b>Add Project </b>
            menu on the header to add a new project
          </p>
        ) : (
           result 
        )}
      </div>
    );
  }
}
