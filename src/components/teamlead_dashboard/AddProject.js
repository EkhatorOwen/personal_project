import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateDescription,
  updateProjectName
} from "../../ducks/teamLead/AddProjectReducer";
import axios from "axios";
import swal from 'sweetalert2';


import moment from "moment";

class AddProject extends Component {
  save = () => {
    const startDate = moment().format("MM/DD/YY, hh:mm");
    let details = {
      name: this.props.AddProject.projectName,
      desc: this.props.AddProject.description,
      created_at: startDate
    };

    //console.log(details);
    axios.post("/api/saveProject", { details }).then(response => {
     // NotificationManager.success("Success", "Project Added Successfully");
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    this.props.updateDescription('')
    this.props.updateProjectName('')
    toast({
      type: 'success',
      title: 'Project added successfully'
    })
    })
  };
  render() {
    return (
      <div className="add-project">
        <h4>Add Project</h4>
        <div className="input-group">
          <p>Project Name</p>
          <input
          value={this.props.AddProject.projectName}
            onChange={e => this.props.updateProjectName(e.target.value)}
            type="text"
          />
        </div>

        <div className="input-group">
          <p>Project Description</p>
          <textarea
          value={this.props.AddProject.description}
            onChange={e => this.props.updateDescription(e.target.value)}
            rows="4"
            cols="72"
          />
        </div>

        <div className="input-group">
          <button onClick={this.save} className="input-button">
            Save Project
          </button>
        </div>
      
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
