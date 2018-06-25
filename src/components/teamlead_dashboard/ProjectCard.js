import React from "react";
import moment from "moment";
import Button from './Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const ProjectCard = props => {
  return (
    <div className="project-card">
      <div className="view view-name">
        <p> {props.element.name}</p>
      </div>
      <div className="view view-description">
        <p> {props.element.description}</p>
      </div>

      <div className="view view-description">
        <p>
          Created:{" "}
          {moment(props.element.created_at).from(
            moment().format("MM/DD/YY, hh:mm")
          )}
        </p>
      </div>
  
      {props.ViewProfile.isLead? <Link to={`/dashboard/project/${props.element.id}`}> <Button 
      label="Manage Project"
      bgColor="green"
      method={false}
      /></Link>:  <Link to={`/dashboard/project/${props.element.id}`}> <Button 
      label="View Project"
      bgColor="green"
      method={false}
      /></Link>  }

      { props.ViewProfile.isLead && <Button
      bgColor="red"
      label="Delete"
      type={null}
      method={()=>props.deleteProject(props.element.id)}
      />}

    </div>
  );
};

const mapStateToProps = state =>{
  return {ViewProfile: state.ViewProfile}
}

export default connect(mapStateToProps,null)(ProjectCard)
