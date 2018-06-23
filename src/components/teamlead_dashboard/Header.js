import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserDetails } from "../../ducks/teamLead/ViewProfileReducer";
import "./Header.css";

class Header extends Component {
  componentDidMount() {
    this.props.getUserDetails();
  }

  render() {
    return (
      <Fragment>
        <div className="header">
          <Link to="/dashboard" className="logo">
            Collaborate{" "}
          </Link>

          <div className="header-right">

            {this.props.ViewProfile.isLead&&<Link to="/dashboard/addproject">Add Project</Link>}
          
            <Link to="/dashboard/viewproject">View Projects</Link>
            <Link to="/dashboard/chat"> Chat</Link>
            <Link to="/dashboard/profile">Profile</Link>
            <a href="http://localhost:3001/logout"> Logout </a>
            <img
              width="50"
              height="50"
              src={this.props.ViewProfile.img}
              alt="avatar"
              style={{ borderRadius: "50%" }}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    ViewProfile: state.ViewProfile,

  };
};
export default connect(
  mapStateToProps,
  { getUserDetails }
)(Header);
