import React, { Component, Fragment } from "react";
//import firebase from "firebase";

import "./App.css";
import routes from "./routes/routes";

class App extends Component {
  render() {
    return <div className="dashboard">{routes}</div>;
  }
}
export default App;
