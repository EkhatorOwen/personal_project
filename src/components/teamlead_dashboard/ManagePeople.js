import React, { Component } from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import swal from 'sweetalert2';

import People from './People';
import Button from './Button'

import './ManagePeople.css'

class ManagePeople extends Component {

  constructor(){
    super()
    this.state={
      name: '',
      email: '',
      phone: '',
      notifyPhone: false,
      projectName: '',
      people: []
    }
  }

  componentDidMount(){
    let id = this.props.match.params.id
    let arr = this.props.GetProject.projects;
    let newArr=  arr.filter(element=>element.id==id)
      this.setState({projectName: newArr[0].name,
                                  
      })

      this.getPeopleProjects()

  }

  add=(e)=>{
    e.preventDefault();
      //console.log(this.props.match.params.id)
    let routeid = this.props.match.params.id;
        let projects = this.props.GetProject.projects;
        let currentProject = projects.filter(elem=>elem.id==routeid)
        let projName = currentProject[0].name
        
    let data={
      projid: this.props.match.params.id,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      notifyPhone: this.state.notifyPhone,
      projectName: projName
    }

   // console.log('data is ', data)
    axios.post('/api/addPeople',{data})
          .then(response=>{
            const toast = swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            }); 
            this.setState({
              name: '',
              email: '',
              phone: ''
            })        
            toast({
              type: 'success',
              title: 'Team member added successfully'
            })
           // console.log(response)
          })
  }

  getPeopleProjects=()=>{
    axios.get(`/api/getPeopleProject/${this.props.match.params.id}`)
          .then(response=>{
           // console.log(response.data)
            this.setState({people: response.data })
          })
  }

  handleNameChange=(val)=>{
    this.setState({name: val})
  }

  handleEmailChange=(val)=>{
    this.setState({email: val})
  }

  handlePhoneChange=(val)=>{
    this.setState({phone: val})
  }

  handleInputChange=(val)=>{
    this.setState({
      notifyPhone: val.checked
    })
  }

  
  remove=(user_id)=>{
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        axios.delete(`/api/deletePeople/${user_id}/${this.props.match.params.id}`)
              .then(response=>{
                swal(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                console.log(response.data)
                this.setState({
                  people: response.data
                })
              })
      }
    })
  }

  render() {
        const people = this.state.people.map((element,index)=>{
          return(
            <People
            key={index}
            element={element}
            remove={this.remove}
            />
          )
        }) 
    return (
      <div className="add-people">
        <h4>{this.state.projectName}</h4>
        <div className="input-details">
        <form onSubmit={this.add}>
          <label>Name:</label>
          <input required value={this.state.name} onChange={e=>this.handleNameChange(e.target.value)} type="text"  />
          <label>email:</label>
          <input required value={this.state.email} onChange={e=>this.handleEmailChange(e.target.value)} type="email"  />
          
          <div className="phone-input">
            <label htmlFor="telNo" >Phone:</label>
            <input id="telNo" maxLength="14" value={this.state.phone}  pattern="[0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}" name="telNo" required onChange={e=>this.handlePhoneChange(e.target.value)} type="tel" placeholder="1-123-4567-8901" />
            <span className="validity" ></span>
          </div>
          
          <div className="input-box">
            <label className="containerr">  Notify by phone? 
              <input 
              type="checkbox"
              onChange={e=>this.handleInputChange(e.target)}
              />
              <span className="checkmark"></span>
            </label>
          </div>

          <Button
          bgColor="blue"
          label="Add"
          type="submit"
          />
       </form>
          </div>
          
        <div className="add-people-button">
        
        </div>
        { this.state.people[0]?people:<div className="no-people"><div><img src="https://image.flaticon.com/icons/svg/88/88206.svg" height="100"width="100"/></div><div><h5>You either have no one added to this project or the person added is yet to signed up</h5></div></div>
        }
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {GetProject: state.GetProject}
}


export default connect(mapStateToProps,null)(ManagePeople)
