import React, { Component, Fragment } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import { getProjects } from '../../ducks/teamLead/GetProjectsReducer'

import './ViewProject.css'
 class ViewProject extends Component {
 

  componentDidMount() {
    // axios.get("/api/projects").then(project => {
    //   console.log(project.data);
    //   this.setState({
    //     projects: project.data
    //   });
    // });
    this.props.getProjects();
  }

//   deleteProject =(id)=>{
//     swal({
//   title: 'Are you sure?',
//   text: "You won't be able to revert this!",
//   type: 'warning',
//   showCancelButton: true,
//   confirmButtonColor: '#3085d6',
//   cancelButtonColor: '#d33',
//   confirmButtonText: 'Yes, delete it!'
// }).then((result) => {
//   if (result.value) {
//     //axios.delete(`project/delete/${id}`)
//             // .then(response=>{
//     swal(
//       'Deleted!',
//       'Your file has been deleted.',
//       'success'
             
//             // })
//     )
//   }
// })
//   }

  render() {
    let proj = this.props.GetProject.projects;
    console.log(proj);
    let result;
    if (proj.length !== 0) {
      result = proj.map((element, index) => {
        return <ProjectCard key={index} element={element} />;
      });
    }

    return (
      <div className="view-project">
        {proj.length === 0 ? (
          <p>
            You have no projects, click the <b>Add Project </b>
            menu to add a new project
          </p>
        ) : (
          result
        )}
    
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {GetProject: state.GetProject}
}

export default connect(mapStateToProps,{getProjects})(ViewProject)
