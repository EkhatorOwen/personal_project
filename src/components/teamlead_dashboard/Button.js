import React from 'react'
import { Link } from 'react-router-dom'
import './Button.css'

 const Button = (props) => {
   
  return (
   
    <button className="button" style={{backgroundColor: props.bgColor }}>{props.label}</button>
   
  )
}

export default Button
