import React, { Component } from "react";
import "./EditProfile.css";
import axios from "axios";

class EditProfile extends Component {
  uploadWidget() {
    const cloudName = "dvwws6e4w";
    var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    window.cloudinary.openUploadWidget(
      { cloud_name: "dvwws6e4w", upload_preset: "wqxxoirx", tags: ["xmas"] },
      function(error, result) {
        console.log(result[0].url);
      }
    );
  }
  render() {
    return (
      <div className="edit-profile">
        <h4>Edit Profile</h4>
        <div className="input-group">
          <p>Name</p>
          <input type="text" />
        </div>
        <div className="input-group">
          <p>Job Title</p>
          <input type="text" />
        </div>
        <div className="input-group">
          <p>Team Name</p>
          <input type="text" />
        </div>
        <div className="input-group">
          <p>Organisation Name</p>
          <input type="text" />
        </div>
        <button onClick={this.uploadWidget.bind(this)}>Upload-button</button>
      </div>
    );
  }
}

export default EditProfile;
