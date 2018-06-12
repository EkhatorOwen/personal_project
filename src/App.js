import React, { Component, Fragment } from "react";
import firebase from "firebase";

import "./App.css";
import routes from "./routes/routes";

class App extends Component {
  constructor() {
    super();
    var config = {
      apiKey: "AIzaSyDcMbg7CX_VC8aW6rr-_5RxZDlzw5-kgME",
      authDomain: "nodb-4bcb2.firebaseapp.com",
      databaseURL: "https://nodb-4bcb2.firebaseio.com",
      projectId: "nodb-4bcb2",
      storageBucket: "nodb-4bcb2.appspot.com",
      messagingSenderId: "993504502530"
    };
    firebase.initializeApp(config);
  }
  render() {
    return <div className="dashboard">{routes}</div>;
  }
}
export default App;
