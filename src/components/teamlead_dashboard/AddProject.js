import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateDescription,
  updateProjectName
} from "../../ducks/teamLead/AddProjectReducer";
import axios from "axios";

import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class AddProject extends Component {
  save = () => {
    let details = {
      name: this.props.AddProject.projectName,
      desc: this.props.AddProject.description
    };

    //console.log(details);
    axios.post("/api/saveProject", { details }).then(response => {
      NotificationManager.success("Success", "Project Added Successfully");
    });
  };
  render() {
    return (
      <div className="add-project">
        <h4>Add Project</h4>
        <div className="input-group">
          <p>Project Name</p>
          <input
            onChange={e => this.props.updateProjectName(e.target.value)}
            type="text"
          />
        </div>

        <div className="input-group">
          <p>Project Description</p>
          <textarea
            onChange={e => this.props.updateDescription(e.target.value)}
            rows="4"
            cols="50"
          />
        </div>

        <div className="input-group">
          <button onClick={this.save} className="input-button">
            Save Project
          </button>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    AddProject: state.AddProject
  };
};

export default connect(
  mapStateToProps,
  { updateDescription, updateProjectName }
)(AddProject);
