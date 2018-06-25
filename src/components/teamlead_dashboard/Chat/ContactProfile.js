import React from 'react'
import { connect } from 'react-redux'

const ContactProfile= (props) => {
  return (
    <div className="contact-profile">
				<img src={props.ViewProfile.img} alt="profile image" />
				<p>{props.ViewProfile.full_name}</p>
			</div>

  )
}

const mapStateToProps = state =>{
  return { ViewProfile: state.ViewProfile}
}
export default connect(mapStateToProps,null)(ContactProfile)

