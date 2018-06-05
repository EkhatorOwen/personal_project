import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateTeamName } from '../../ducks/teamLead/SignupReducer';


 class Step2 extends Component {
    render(){
  return (
    <div>
        <h1>Step 2 of 3</h1>
        <h3>What is the name of your team?</h3>

          <div>
        <label>Team Name</label>
        <input required onChange={e=>this.props.updateTeamName(e.target.value)} placeholder="Your team name"></input>
        </div>
        
        <div>
        <Link to="/setup/step1"> <button>Previous Step</button></Link>
        </div>

        <div>
        <Link to="/setup/step3"> <button>Next Step</button></Link>
         </div>    
    </div>
  )
}
}

const mapStateToProps =(state) =>{
  return {...state} 
}

export default connect(mapStateToProps,{updateTeamName})(Step2)