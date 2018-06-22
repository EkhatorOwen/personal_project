import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateCompanyName,
  updateJobTile
} from "../../ducks/teamLead/SignupReducer";

class Step1 extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Step 1 of 2</h1>
        </div>

        <div>
          <label>Company Name</label>
          <input
            required
            onChange={e => this.props.updateCompanyName(e.target.value)}
            placeholder="Your company name"
          />
        </div>

        <div>
          <label>Job Title</label>
          <input
            onChange={e => this.props.updateJobTile(e.target.value)}
            placeholder="your job title"
          />
        </div>

        <div>
          <Link to="/setup/step2">
            {" "}
            <button>Next Step</button>
          </Link>
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
  { updateCompanyName, updateJobTile }
)(Step1);
