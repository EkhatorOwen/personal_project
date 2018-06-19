import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment'

import Message from './Message'

import FroalaEditorInput from 'react-froala-wysiwyg'

import FroalaEditor from 'react-froala-wysiwyg';


import Button from './Button'

import './MessageBoard.css'

export default class MessageBoard extends Component {
    constructor(){
        super()
        this.state={
            content : '',
            isEditing: false,
            messages: [],
            title: ''
        }
    }

     handleModelChange= (value)=>{
            this.setState({
                content: value
            })
    }

    componentDidMount(){
        axios.get(`/api/getMessages/${this.props.match.params.id}`)
             .then(response=>{
                
                this.setState({messages: response.data})
             })
    }

    submit=()=>{
        const startDate = moment().format("MM/DD/YY, hh:mm");
        let obj={
            title: this.state.title,
            content: this.state.content,
            projId: this.props.match.params.id,
            created_at: startDate
        }

        axios.post('/api/addMessage/',obj)
             .then(response=>{
                 this.setState({
                     isEditing: false,
                     messages: response.data
                })
             }) 
    }

    handleTitleChange=(value)=>{
        this.setState({
            title: value
        })
    }

    edit=()=>{

    }

    delete=()=>{

    }


    newMessage=()=>{
        this.setState(preState=>({
            isEditing: !preState.isEditing
        }))
    }

  render() {
        const messages = this.state.messages.map((element,index)=>{
               return (
                   <Message
                   key={index}
                   element={element}
                   />
               )
        })
    
    return (
      <div className="message-board-box">

      <div className="message-board-header">
            <div className="message-title">
                <p>Message Board</p>
            </div>

            <div className="message-button">
                <Button
                bgColor="green"
                label="New Message"
                method={this.newMessage}
                />

            </div>
        </div>

       { this.state.isEditing && <div className="editor">
        <div className="editor-helper">

        <div className="title-input">
            <div className="message-title-label">
            <p>Title:</p>
            <input onChange={e=>this.handleTitleChange(e.target.value)}/>
            </div>
        </div>

        <div className="message-editor-helper">
        <p>Message:</p>

        <FroalaEditor
        model={this.state.content}
        tag='textarea'
        onModelChange={this.handleModelChange}
        />

        <FroalaEditorInput
           
            />

        FroalaEditorInput
        <div className="message-sumbit-button">
        <Button
        bgColor="black"
        label="Submit"
        method={this.submit}
        />
        </div>
        </div>
      

        </div>
        </div>}

        <div className="message-box">

       { this.state.messages.length===0? 
        <div className="no-message">
            <div className="no-message-image">
            <img src="https://image.flaticon.com/icons/svg/576/576827.svg" height="200px" width="200px"/>
            </div>
        <div className="no-message-content">
         <h4> You have no message, click on the New Message button 
            to add a message
        </h4>
        </div>
        </div>:messages}
            
      </div>

    </div>
    )
  }
}
