import React, { Component } from 'react'
import ContactProfile from './ContactProfile'
import Messages from './Messages';
import InputBox from './InputBox'


export default class Body extends Component {
  render() {
    return (
     
      <div className="content">
            
      <ContactProfile/>
      <Messages
      chats={this.props.chats}
      />
      <InputBox
      handleChange={this.props.handleChange}
      handleClick={this.props.handleClick}
      inputValue={this.props.inputValue}
      handleKeyPress={this.props.handleKeyPress}
      />
			
    </div>
      
     
    )
  }
}
