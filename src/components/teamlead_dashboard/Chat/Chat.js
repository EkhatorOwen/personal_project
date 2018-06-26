import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Body from './Body'
import axios from 'axios'

import Pusher from 'pusher-js';

import { getChatPeople } from '../../../ducks/chat/GetPeopleChatReducer'
import { connect } from 'react-redux'
import key from './../key'

import './Chat.css'
        

 class Chat extends Component {
   constructor(props){
     super(props)
     this.state={
        input: '',
        chats: [],
        username: '',
        currentUser: {}
       }


     }
   

  componentDidMount(){
    
   this.props.getChatPeople()

  
    const pusher = new Pusher(key.PUSHER_KEY, {
      cluster: 'us2',
      encrypted: true
    });
    const channel = pusher.subscribe('chat');
    channel.bind('message', data => {
      console.log(data)
      this.setState({ chats: [...this.state.chats, data] });
    });
  }

  handleInputChange=(value)=>{
      this.setState({
        input: value
      })
  }

  handleClick=()=>{
          const payload = {
            id: this.props.ViewProfile.id,
            message: this.state.input,
            img_url: this.props.ViewProfile.img
          };
          axios.post('/message', payload);
     
         this.setState({ input: '' })
        
        } 


  render() {
    return (
      <div className="chat">
        
      <div id="frame">

	  <Sidebar
  
    />

		<Body
    handleChange={this.handleInputChange}
    handleClick={this.handleClick}
    inputValue={this.state.input}
    chats={this.state.chats}
    />
    
	</div>
      </div>
    )
  }
  }

const mapStateToProps = state =>{
  return { GetPeopleChat: state.GetPeopleChat,
            ViewProfile: state.ViewProfile
             }
}
export default connect(mapStateToProps,{getChatPeople})(Chat)
