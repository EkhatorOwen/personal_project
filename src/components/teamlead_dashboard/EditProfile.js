import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import ImageUploader from "react-images-upload";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

import {
  getName,
  getJobtitle,
  getEmail,
  getImg,
  getOrgname,
  getTeamname
} from "../../ducks/teamLead/ViewProfileReducer";
import "./EditProfile.css";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      pictures: []
    };
  }

  saveChange = () => {
    let obj = {
      name: this.props.ViewProfile.name,
      jobTitle: this.props.ViewProfile.jobtitle,
      teamName: this.props.ViewProfile.teamname,
      im
    };
    axios.post("/api/updateProfile", obj).then(response => {
      console.log(response);
    });
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.props.getImg(url));
  };

  render() {
    return (
      <div className="edit-profile">
        <h4>Edit Profile</h4>
        <div className="input-group">
          <p>Display Name</p>
          <input
            value={this.props.ViewProfile.name}
            onChange={e => this.props.getName(e.target.value)}
            type="text"
          />
        </div>
        <div className="input-group">
          <p>Job Title</p>
          <input
            value={this.props.ViewProfile.jobtitle}
            onChange={e => this.props.getJobtitle(e.target.value)}
            type="text"
          />
        </div>
        <div className="input-group">
          <p>Team Name</p>
          <input
            value={this.props.ViewProfile.teamname}
            onChange={e => this.props.getTeamname(e.target.value)}
            type="text"
          />
        </div>

        <div className="input-group">
          <p>
            Profile picture:
            <FileUploader
              accept="image/*"
              name="avatar"
              randomizeFilename
              storageRef={firebase.storage().ref("images")}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </p>
        </div>

        <div className="input-group">
          <button className="input-button" onClick={this.saveChange}>
            Save Changes
          </button>
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
  {
    getName,
    getJobtitle,
    getEmail,
    getImg,
    getOrgname,
    getTeamname
  }
)(EditProfile);
