import React, { Component, Fragment } from "react";
//import firebase from "firebase";
import "react-notifications/lib/notifications.css";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';


import "./App.css";
import routes from "./routes/routes";

class App extends Component {
  render() {
    return <div className="dashboard">{routes}</div>;
  }
}
export default App;
