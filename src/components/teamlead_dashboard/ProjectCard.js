import React from "react";
import moment from "moment";
import Button from './Button'

const ProjectCard = props => {
  return (
    <div className="project-card">
      <div className="view view-name">
        <p>Name: {props.element.name}</p>
      </div>
      <div className="view view-description">
        <p>Description: {props.element.description}</p>
      </div>

      <div className="view view-description">
        <p>
          Created:{" "}
          {moment(props.element.created_at).from(
            moment().format("MM/DD/YY, hh:mm")
          )}
        </p>
      </div>
  
      <Button 
      label="Manage Project"
      bgColor="green"
      />

      <Button
      bgColor="red"
      label="Delete"
      />

    </div>
  );
};

export default ProjectCard;
