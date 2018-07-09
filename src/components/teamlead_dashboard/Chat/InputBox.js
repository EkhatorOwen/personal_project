import React from 'react'

 const InputBox =(props) => {
  return (
    <div className="message-input">
				<div className="wrap">
					<input value={props.inputValue} onChange={(e)=>props.handleChange(e.target.value)} onKeyPress={(e)=>props.handleKeyPress(e)} type="text" placeholder="Write your message..." />
				
					<button onClick={()=>props.handleClick()}  className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
				</div>
			</div>
  )
}

export default InputBox
