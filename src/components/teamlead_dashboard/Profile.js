import React, { Component } from "react";
import axios from "axios";
import "./profile.css";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      jobTitle: "",
      email: "",
      pic: "",
      orgname: ""
    };
  }
  componentDidMount() {
    axios.get("/api/profile").then(response => {
      this.setState({
        name: response.data.displayName,
        jobTitle: "",
        email: response.data.emails[0],
        pic: response.data.picture
      });
    });
  }
  render() {
    return (
      <div className="profile-page">
        <div className="profile-items">
          <img
            width="150"
            height="150"
            src="http://via.placeholder.com/150x150"
            alt="avatar"
            style={{ borderRadius: "50%" }}
          />
          <label className="profile-label">
            <p>
              {" "}
              <strong>Name: </strong>
            </p>
            <p>Owen Ekhator</p>
          </label>

          <label className="profile-label">
            <p>
              <strong>Job Title: </strong>
            </p>
            <p>Software Test Analyst</p>
          </label>
          <label className="profile-label">
            <p>
              {" "}
              <strong> Email: </strong>{" "}
            </p>
            <p>owenekhator@rocketmail.com</p>
          </label>
          <label className="profile-label">
            <p>
              <strong>Organisation Name:</strong>{" "}
            </p>
            <p>Dev Mountain</p>
          </label>
          <button>Update</button>
        </div>
      </div>
    );
  }
}
