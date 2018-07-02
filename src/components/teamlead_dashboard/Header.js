import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserDetails } from "../../ducks/teamLead/ViewProfileReducer";
import { changeClass } from '../../ducks/class/ClassReducer'

import "./Header.css";

class Header extends Component {
  constructor(){
    super();
    this.state={
      class: true
    }
  }
  componentDidMount() {
    this.props.getUserDetails();
  }

  clickClass=()=>{
    this.props.changeClass()
    // this.setState(prevState=>({
    //   class: !prevState.class
    // }))
  }

  render() {
    return (
      <Fragment>
        <div className="header">
          <Link to="/dashboard/viewproject" className="logo">
            Collaborate{" "}
          </Link>

          <div className={this.props.Class.class?"header-right":"responsive"}>

            <div className="hamburger">
            <i onClick={this.clickClass} className="fa fa-bars icon"></i>
            </div>

            {this.props.ViewProfile.isLead&&<Link to="/dashboard/addproject">Add Project</Link>}
          
            <Link to="/dashboard/viewproject">View Projects</Link>
            <Link to="/dashboard/chat"> Chat</Link>
            <Link to="/dashboard/profile">Profile</Link>
            <a href={process.env.REACT_APP_LOGOUT}> Logout </a>
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
    Class: state.ClassReducer

  };
};
export default connect(
  mapStateToProps,
  { getUserDetails,changeClass }
)(Header);
