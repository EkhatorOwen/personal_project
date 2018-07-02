import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setClass } from '../../ducks/class/ClassReducer'
import { getUserDetails } from "../../ducks/teamLead/ViewProfileReducer";
import "./profile.css";

class Profile extends Component {

  componentDidMount(){
    this.props.setClass()
  }
  render() {
    return (
      <div className="profile-page">
        <div className="profile-items">
          <img
            width="150"
            height="150"
            src={this.props.ViewProfile.img}
            alt="avatar"
            style={{ borderRadius: "50%" }}
          />
          <label className="profile-label">
            <p>
              {" "}
              <strong>Display Name: </strong>
            </p>
            <p>{this.props.ViewProfile.name}</p>
          </label>

          <label className="profile-label">
            <p>
              <strong>Job Title: </strong>
            </p>
            <p>{this.props.ViewProfile.jobtitle}</p>
          </label>
          <label className="profile-label">
            <p>
              {" "}
              <strong> Email: </strong>{" "}
            </p>
            <p>{this.props.ViewProfile.Email}</p>
          </label>
          <label className="profile-label">
            <p>
              <strong>Team Name:</strong>{" "}
            </p>
            <p>{this.props.ViewProfile.teamname}</p>
          </label>
          <label className="profile-label">
            <p>
              <strong>Organisation Name:</strong>{" "}
            </p>
            <p>{this.props.ViewProfile.orgName}</p>
          </label>
          <Link to="/dashboard/editprofile">
            {" "}
            <button>Edit</button>
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ViewProfile: state.ViewProfile
  };
};
export default connect(
  mapStateToProps,
  {setClass}
)(Profile);
