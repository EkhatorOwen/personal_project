import React from "react";

const ProjectCard = props => {
  return (
    <div className="project-card">
      <div className="view-name">
        <p>Name: {props.element.name}</p>
      </div>
      <div className="view-description">
        <p>Description: {props.element.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
