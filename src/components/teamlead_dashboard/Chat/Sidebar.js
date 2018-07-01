import React from 'react'
import { connect } from 'react-redux'
import { getChatPeople } from '../../../ducks/chat/GetPeopleChatReducer'
 
const Sidebar = (props) => {
   let people = props.GetPeopleChat.chatPeople.map((response,index)=>{
       return (
           
           <li key={index}  className="contact">
            <div  className="wrap">
                <span className="contact-status online"></span>
                <img src={response.img_url} alt="" />
                <div className="meta">
                    <p className="name">{response.full_name}</p>
            
                </div>
            </div>
        </li>
       )

   })
  return (
    <div id="sidepanel">
		
    
<div id="contacts">
    <ul>
        {people}
    
    </ul>
</div>

</div>
  )
}

const mapStateToProps = state =>{
  return { GetPeopleChat: state.GetPeopleChat }
}

export default connect(mapStateToProps,null) (Sidebar)