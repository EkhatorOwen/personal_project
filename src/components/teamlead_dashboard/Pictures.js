import React from 'react'

const Pictures = (props) => {
  return (
    
    <div className="title-img tooltipi">
    {props.element.img_url&&(<div><img src={props.element.img_url}  height="60" width="60" style={{ borderRadius: "50%" }} />
    <span className="tooltiptexti">{props.element.full_name}</span></div>)}
    </div>
    
    
  )
}

export default Pictures;
