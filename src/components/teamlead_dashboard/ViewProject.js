import React, { Component, Fragment } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import { getProjects } from '../../ducks/teamLead/GetProjectsReducer'
import { setClass } from '../../ducks/class/ClassReducer'

import './ViewProject.css'

 class ViewProject extends Component {
 

  componentDidMount() {
   
    this.props.getProjects();
     this.props.setClass();
  }

  deleteProject =(id)=>{
    swal({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.value) {
    axios.delete(`/api/deleteProject/${id}`)
            .then(response=>{
    swal(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )  
    this.props.getProjects()
            })
  }
})
  }

  render() {
    let proj = this.props.GetProject.projects;
   // console.log(proj);
    let result;
    if (proj.length !== 0) {
      result = proj.map((element, index) => {
        return <ProjectCard
         key={index}
         element={element}
         deleteProject={this.deleteProject}
           />;
      });
    }

    return (
      <div className="view-project">
        {proj.length === 0 ? (
          <div className="no-message">
          <img src="https://image.flaticon.com/icons/svg/80/80565.svg" height="200px" width="200px"/>
          <div className="no-message-content">
          <h4>
            You have no projects, click the <b>Add Project </b>
            menu to add a new project
          </h4>
          </div>
          </div>
        ) : (
          
          result
        )}
    
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {GetProject: state.GetProject,
          ViewProfile: state.ViewProfile,
         
        }
}

export default connect(mapStateToProps,{getProjects,setClass})(ViewProject)
