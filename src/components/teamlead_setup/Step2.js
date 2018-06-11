import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";

import { updateTeamName } from "../../ducks/teamLead/SignupReducer";

class Step2 extends Component {
  submit = () => {
    let details = {
      companyName: this.props.SignupReducer.companyName,
      jobTitle: this.props.SignupReducer.jobTitle,
      teamName: this.props.SignupReducer.teamName
    };
    axios.post("/api/teamlead", details).then(res => {
      console.log(res);
      this.props.history.push("/dashboard");
    });
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <h1>Step 2 of 2</h1>
        <h3>What is the name of your team?</h3>

        <div>
          <label>Team Name</label>
          <input
            required
            onChange={e => this.props.updateTeamName(e.target.value)}
            placeholder="Your team name"
          />
        </div>

        <div>
          <Link to="/setup/step1">
            {" "}
            <button>Previous Step</button>
          </Link>
        </div>

        <div>
          <button onClick={this.submit}>All done!</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { SignupReducer: state.SignupReducer };
};

export default connect(
  mapStateToProps,
  { updateTeamName }
)(Step2);
