import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
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
  uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      { cloud_name: "dvwws6e4w", upload_preset: "wqxxoirx", tags: ["xmas"] },
      function(error, result) {
        console.log(result);
        // res = result[0].url;
        //this.props.getEmail(result[0].url);
        // console.log(result[0].url);
        console.log(window);
        if (result[0].url != undefined) {
          axios.post("/api/updatePicture", { result }).then(response => {
            console.log(response);
          });
        }
      }
    );
    // console.log(res);
    // this.props.getEmail(res);
  };

  saveChange = () => {
    let obj = {
      name: this.props.ViewProfile.name,
      jobTitle: this.props.ViewProfile.jobtitle,
      teamName: this.props.ViewProfile.teamname
    };
    axios.post("/api/updateProfile", obj).then(response => {
      console.log(response);
    });
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

        <button className="input-button" onClick={this.uploadWidget}>
          Change Profile Picture
        </button>
        <button className="input-button" onClick={this.saveChange}>
          Save Changes
        </button>
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
