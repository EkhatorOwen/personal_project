import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTask } from '../../ducks/task/GetTaskReducer'
import { Doughnut } from 'react-chartjs-2';

import './Visual.css' 
 class Vizuals extends Component {

    constructor(){
      super()
      this.state={
        arr: [],
        pending: 0,
        completed: 0,
        total: 0
      }
    }
 

  componentDidMount(){
    this.props.getTask(this.props.match.params.id)
              .then(response=>{
             let arr=   response.value.data.filter(element=>{
                   return element.status=='PENDING'
                 })
                this.setState({
                  pending: arr.length,
                  total: response.value.data.length,
                  completed: response.value.data.length - arr.length
                })
              })
  }


  render() {

   let arr = this.props.GetProject.projects.filter(element=>{
     return  element.id==this.props.match.params.id
    })
    
  
    const data = {
      labels: [
        'Pending',
        'Completed'
        
      ],
      datasets: [{
        data: [this.state.pending, this.state.completed],
        backgroundColor: [
        '#FF6384',
        '#36A2EB',
        
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        ]
      }]
    };


    return (

      <div className="no-task-assigned">
      {this.props.GetTask.task.length!==0?(<div className="doughnut">

      <div className="doughnut-text">
              <div className="doughnut-title">
                <p>{arr && arr[0].name}</p>
              </div>
                <div className="doughnut-desc">
                <p>Doughnut repersentation of task completed vs task pending.</p>
            </div>
        </div>
       
        <Doughnut height={300}  data={data}/>
        </div>):<p>No task assigned. Assign a task to view the graprical repersentation of its status.</p>}
      </div>
    )
  }
}

const mapStateToProps =(state)=>{
  return{
    GetTask: state.GetTask,
    GetProject: state.GetProject
  }
}

export default connect(mapStateToProps,{getTask})(Vizuals)
