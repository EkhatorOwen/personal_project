import React from 'react'
import { connect } from 'react-redux'

 const Messages= (props) => {
	 	let chat=props.chats.map((element,index)=>{
			 	return(
					<li key={index} className={element.id===props.ViewProfile.id?"sent":"replies"}>
						<img src={element.img_url} alt="" />
						<p>{element.message}</p>
					</li> 
				 )
			 })

  return (
    <div className="messages">
				<ul>
					{chat}
			
				</ul>
			</div>
  )
}

const mapStateToProps = state =>{
  return { ViewProfile: state.ViewProfile}
}
export default connect(mapStateToProps,null)(Messages)
