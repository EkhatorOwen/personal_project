import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateJobTile
} from "../../ducks/teamLead/SignupReducer.js";

import axios from 'axios';

class Step extends Component {

  submit = () => {
    let details = {  
      jobTitle: this.props.Signup.jobTitle
    };
    axios.post("/api/saveJobTitle", details).then(res => {
      console.log(res);
      this.props.history.push("/dashboard/viewproject");
    });
  }
  render() {
    return (
      <div className="step1of1-container">

        <div className="step1of1">
          <h1>Step 1 of 1</h1>
        </div>

        <div>
          <label>Job Title: </label>
          <input
            onChange={e => this.props.updateJobTile(e.target.value)}
            placeholder="your job title"
          />
        </div>

        <div className="all-done">
          <button onClick={this.submit}>All done!</button>
        </div>
       
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { Signup: state.Signup };
};

export default connect(
  mapStateToProps,
  { updateJobTile }
)(Step);
