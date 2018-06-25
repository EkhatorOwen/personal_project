import React,{Component} from 'react'
import swal from 'sweetalert2'


import Button from './Button'
import './People.css'

class People extends Component{

    
    render(){
  return (
    <div className="people-details">
      <div className="people-box">
        <div className="people-img">
            <img src={this.props.element.img_url} height="70px" width="70px" style={{borderRadius:"50%"}}/>
        </div>
        <div className="view-people-details">

            <div>
            <p><b>Name: </b>{this.props.element.name}</p>
            <p><b>Email: </b>{this.props.element.email}</p>
            </div>
            <div className="remove-button">
            <Button
            bgColor="red"
            label="Remove"
            method={()=>this.props.remove(this.props.element.id)}
            type={null}
            />
            </div>
        </div>
      </div>
    </div>
  )
}
}

export default People;
