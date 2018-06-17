import React from 'react'

import './Button.css'

 const Button = (props) => {
   
  return (
    <button className="button" type={props.type||null} onClick={props.method?()=>props.method():null} style={{backgroundColor: props.bgColor }}>{props.label}</button>
  )
}

export default Button
