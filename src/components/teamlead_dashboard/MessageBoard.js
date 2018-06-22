import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment'

import swal from 'sweetalert2';

import Message from './Message'

import FroalaEditorInput from 'react-froala-wysiwyg'

import FroalaEditor from 'react-froala-wysiwyg';


import Button from './Button'

import 'font-awesome/css/font-awesome.css';
import './MessageBoard.css'

 class MessageBoard extends Component {
    constructor(){
        super()
        this.state={
            content : '',
            isEditing: false,
            messages: [],
            title: '',
            toggleEdit: false,
            messageId: 0,
            userId: 0,  
        }

        this.config={name: 'owen'}
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

    update=()=>{
        let obj={
            id: this.state.messageId,
            title:this.state.title,
            content: this.state.content,
            userId: this.state.userId,
            projId: this.props.match.params.id
        }
        axios.put('/api/updateMessage',obj)
              .then(response=>{
                const toast = swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                  });    
                  toast({
                    type: 'success',
                    title: 'Updated successfully'
                  })
                  this.setState({
                    isEditing: false,
                    messages: response.data,
                    title: '',
                    content: '',
                    toggleEdit: false
                  })
              })
    }

    toggleEdit=(title,content,id,userId)=>{
        this.setState(prevState=>({
            isEditing: !prevState.isEditing,
            title: title,
            content: content,
            toggleEdit: !prevState.toggleEdit,
            messageId: id,
            userId: userId
        }))
    }

    delete=(id)=>{

      let projId= this.props.match.params.id;

        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {

        //axios delete call will go here
        axios.delete(`/api/deleteMessage/${projId}/${id}`)
                .then(response=>{
                    this.setState({
                        isEditing: false,
                        messages: response.data})
                        const toast = swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                          });    
                          toast({
                            type: 'success',
                            title: 'Deleted successfully'
                          })
                })
            }
          })

    }


    newMessage=()=>{
        this.setState(preState=>({
            title: '',
            isEditing: !preState.isEditing,
            content: ''
        }))
    }

  render() {

    const messages = this.state.messages.map((element,index)=>{
            return (
                <Message
                key={index}
                element={element}
                toggleEdit={this.toggleEdit}
                delete={this.delete}
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
            <input value={this.state.title} onChange={e=>this.handleTitleChange(e.target.value)}/>
            </div>
        </div>

        <div className="message-editor-helper">
        <p>Message:</p>

        <FroalaEditor
        model={this.state.content}
        
        onModelChange={this.handleModelChange}
        />

       
        <div className="message-sumbit-button">
        {   this.state.toggleEdit?
            <Button
            bgColor="blue"
            label="Save"
            method={this.update}
            /> : <Button
        bgColor="black"
        label="Submit"
        method={this.submit}
        />}

        </div>
        </div>
      

        </div>
        </div>}

        <div className="message-box">

       { this.state.messages.length===0? 
        <div className="no-message">
            <div className="no-message-image">
            <img src="https://image.flaticon.com/icons/svg/962/962356.svg" height="200px" width="200px"/>
            </div>
        <div className="no-message-content">
         <h4> There are currently no messages on the board, click on the New Message button 
            to add a message
        </h4>
        </div>
        </div>:messages}
            
      </div>

    </div>
    )
  }
}


export default MessageBoard;
