import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <Fragment>
        <div className="header">
          <Link to="/dashboard" className="logo">
            Collaborate{" "}
          </Link>

          <div className="header-right">
            <Link to="/dashboard/addproject">Add Project</Link>
            <Link to="/dashboard/viewproject">View Projects</Link>
            <Link to="/dashboard/chat"> Chat</Link>
            <Link to="/dashboard/profile">Profile</Link>
            <a href="http://localhost:3001/logout"> Logout </a>
            <img
              src="http://via.placeholder.com/50x50"
              alt="avatar"
              style={{ borderRadius: "50%" }}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Header;
