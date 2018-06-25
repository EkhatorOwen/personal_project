import React, { Component } from 'react'
import axios from 'axios'
import Button from './Button'
import { connect } from 'react-redux';
import { getPeople } from '../../ducks/teamMember/GetPeopleReducer'
import swal from 'sweetalert2';
import moment from 'moment';
import { getTask } from '../../ducks/task/GetTaskReducer'
import Table from './Table'
import UserTable from './UserTable'


import './ViewTask.css'


 class ViewTask extends Component {
    constructor(){
      super()
      this.state={
          name: '',
          desc: '',
          project: '',
          members: '',
          notifyPhone: false,
          isEditing: false,
          selected: '',
          assignTask: false,
          
      }
    }

    componentDidMount(){
        this.props.getPeople(this.props.match.params.id)
        this.props.getTask(this.props.match.params.id)
    }

    
      handleNameChange=(val)=>{
        this.setState({name: val})
      }

      handleDescChange=(val)=>{
        this.setState({desc: val})
      }

      handleInputChange=(val)=>{
        this.setState({ notifyPhone: val.checked})
      }

      handleSelectChange=(val)=>{
    // console.log(val)
        this.setState({ selected:val })
      }

      handleAssignTask=()=>{
          this.setState(prevState=>({ assignTask: !prevState.assignTask }))
      }

      handleSubmit=(e)=>{
        e.preventDefault();
        if(this.state.selected==="Click here"||this.state.selected===""){
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'Please select a valid teammember',
          })
          return;
        }
        let routeid = this.props.match.params.id;
        let projects = this.props.GetProject.projects;
        let currentProject = projects.filter(elem=>elem.id==routeid)
        let projName = currentProject[0].name


        let personID= this.state.selected;
        let personData= this.props.GetPeople.people;
        let arr=personData.filter(element=>element.id==personID)
     
        
        let obj={
          name: this.state.name,
          desc: this.state.desc,
          assigned_date: moment().format("MM/DD/YY"),
          proj_id: this.props.match.params.id,
          userid: this.state.selected,
          notifyPhone: this.state.notifyPhone,
          projName: projName,
          email: arr[0].email,
          personName: arr[0].name
        }

        axios.post(`/api/assignTask/${this.props.match.params.id}`,obj)
             .then(response=>{
              const toast = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });            
              toast({
                type: 'success',
                title: 'Task assigned successfully'
              }) 
              this.props.getTask(this.props.match.params.id)
              this.setState({
                name: '',
                desc: '',
                selected: '',
                assignTask: false
              })
             })
      }

  render() {
  const selectItems = this.props.GetPeople.people.map((element,index)=>{
          return (
            <option  key={element.id} value={element.id}>{element.name}</option>
          )
    })
    return (
      <div className="teammember-task">
      {this.props.ViewProfile.isLead?(<div className="task">
      {this.props.GetPeople.people[0]?(  
        <div className="view-task">
          <div className="task-button">
            <Button
              label="Assign Task"
              method={this.handleAssignTask}
              bgColor='#287592'
              type="submit"
            />
          </div>

       { this.state.assignTask && 
        
        (
        <div className="assign-task">
          <form onSubmit={this.handleSubmit}>
            <p>Task Name:</p><input value={this.state.name} required onChange={e=>this.handleNameChange(e.target.value)} type="text" name="name"/>
            <p>Description:</p><textarea  value={this.state.desc} required onChange={e=>this.handleDescChange(e.target.value)} name="desc"/>
            
            <div className="task-select">
              <label> Assign to: 
                <select  value={this.state.selected} onChange={e=>this.handleSelectChange(e.target.value)}>
                <option>Click here</option>
                {/*<option></option>*/}
                {selectItems}
                  </select>
              </label>
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
            <div className="task-submit">
              <input type="submit" value="Submit" />
            </div>
          </form>

        </div>
        
      )}
        <div><Table
          projID={this.props.match.params.id}
        /></div>

        </div>
      
      
      ):<p>There are currently no members on this project, go to manage project page to add members</p>}
      </div>):
      <div className="user-table">
      <UserTable
      proj_id={this.props.match.params.id}
      />
      </div>
    }
      </div>

    )
  }
}

const mapStateToProps = state=>{
  return{
      GetPeople: state.GetPeople,
      GetProject: state.GetProject,
      GetTask: state.GetTask,
       ViewProfile: state.ViewProfile
  }
}
export default connect(mapStateToProps,{getPeople,getTask})(ViewTask)
