import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redesign: "",
      plan: "",
      launch: "",
      rebrand: ""
    };
  }

  submit = () => {
    let currentProject = [
      this.state.redesign,
      this.state.plan,
      this.state.launch,
      this.state.rebrand
    ];
    currentProject = _.compact(currentProject);
    let details = {
      companyName: this.props.SignupReducer.companyName,
      jobTitle: this.props.SignupReducer.jobTitle,
      teamName: this.props.SignupReducer.teamName,
      currentProject
    };

    axios.post("/api/teamlead", details).then(res => console.log(res));
  };

  handleredesignChange = () => event => {
    this.setState({ redesign: event.target.value });
  };

  handleplanChange = () => event => {
    this.setState({ plan: event.target.value });
  };
  handlelaunchChange = () => event => {
    this.setState({ launch: event.target.value });
  };
  handlerebrandChange = () => event => {
    this.setState({ rebrand: event.target.value });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Step 3 of 3</h1>

        <FormControl component="fieldset">
          <FormLabel component="legend">
            Do you have any of these projects going on right now?
          </FormLabel>
          <FormLabel component="legend">You can do this now or later</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleredesignChange("redesign")}
                  value="Redesigning a website"
                />
              }
              label="Redesigning a website"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleplanChange("plan")}
                  value="Planning an event"
                />
              }
              label="Planning an event"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handlelaunchChange("launch")}
                  value="Launching a new product"
                />
              }
              label="Launching a new product"
            />

            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handlerebrandChange("rebrand")}
                  value="Rebranding a business"
                />
              }
              label="Rebranding a business"
            />
            <button onClick={this.submit}>All done!</button>
          </FormGroup>
        </FormControl>
        <div>
          <Link to="/setup/step2">
            {" "}
            <button>Previous Step</button>
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { ...state };
};

export default connect(
  mapStateToProps,
  null
)(Step3);
