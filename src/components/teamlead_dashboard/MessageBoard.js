import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Button from './Button'

import './MessageBoard.css'

export default class MessageBoard extends Component {
    constructor(){
        super()
        this.state={
            model : 'Sample text'
        }
    }
     handleModelChange= (value)=>{
            this.setState({
                model: value
            })
    }
///dashboard/project/:id/composemessage for my compose button
  render() {
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
                />
            </div>
        </div>

        <div className="message-box">
            <div className="message-content">
                
                        <div className="message-table-avatar">
                            <img src="http://via.placeholder.com/75x75" alt="avatar"/>
                        </div>

                        <div className="message-content-more">
                            <div className="message-subject">
                            <p className="title">this is where the subject will go</p>
                            <div className="message-date">
                            <p>5 hours ago</p></div>
                            </div>

                            <div className="message-desc">
                            <p>eadable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. </p>
                            </div>
                            <div className="message-footer"> 
                                <div className="message-poster">
                                <p>Posted by Owen Ekhator</p>
                                </div>
                                <div className="footer-actions">
                                    <div className="message-edit">
                                    <img src="https://image.flaticon.com/icons/svg/149/149307.svg" height="20px" width="20px" />
                                    </div>
                                    <div className="message-delete">
                                    <img src="https://www.flaticon.com/premium-icon/icons/svg/484/484662.svg" height="20px" width="20px" />
                                    </div>
                                </div>
                            </div>
                        </div>
                
            </div>
      </div>

    </div>
    )
  }
}
