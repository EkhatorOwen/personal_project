import React from 'react';
import { connect } from 'react-redux'

import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import moment from 'moment'


 const Message= (props) => {
     
  return (
    <div className="message-content">              
                        <div className="message-table-avatar">
                            <img src={props.element.img_url} alt="avatar" height="100px" width="100px"/>
                        </div>

                        <div className="message-content-more">
                            <div className="message-subject">
                            <p className="title">{props.element.title}</p>
                            <div className="message-date">
                            <p>created: {moment(props.element.created_at).from(
                                moment().format("MM/DD/YY, hh:mm")
                              )}</p></div>
                            </div>

                            <div className="message-desc">
                           <FroalaEditorView model={props.element.body} />
                            </div>
                            <div className="message-footer"> 
                                <div className="message-poster">
                                <p>Posted by {props.element.full_name}</p>
                                </div>
                                <div className="footer-actions">
                                    {props.ViewProfile.id==props.element.user_id && <div onClick={()=>props.toggleEdit(props.element.title,props.element.body,props.element.id,props.element.user_id)} className="message-edit">
                                    <img src="https://image.flaticon.com/icons/svg/149/149307.svg" height="20px" width="20px" />
                                    </div>}

                                    {props.ViewProfile.id==props.element.user_id && <div onClick={()=>props.delete(props.element.id)} className="message-delete">
                                    <img src="https://www.flaticon.com/premium-icon/icons/svg/484/484662.svg" height="20px" width="20px" />
                                    </div>}
                                </div>
                            </div>
                        </div>
                
            </div>
  )
}

const mapStateToProps=state=>{
    return {ViewProfile: state.ViewProfile}
}

export default connect(mapStateToProps, null)(Message);
