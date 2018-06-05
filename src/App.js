import React, { Component,Fragment } from 'react';

import './App.css';
import routes from './routes/routes'

class App extends Component {
 
  render() {
  return (
    <div>
    {routes}
    </div>
  )
  }
}
export default App;
