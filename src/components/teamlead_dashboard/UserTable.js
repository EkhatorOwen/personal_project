import React, { Component } from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios'
import moment from 'moment'
import swal from 'sweetalert2'

import './UserTable.css'


class UserTable extends Component {
constructor(){
    super();
    this.state={
        task: [],
        status:['PENDING','COMPLETED']
    }
}
componentDidMount(){
    
axios.get(`/api/getUserTask/${this.props.proj_id}`)
      .then(respone=>{
        let ID = 0 
     let newArr=respone.data.map(element=>{
        ID++
            return{
                ...element, ID: ID
            }   
        })
            
          this.setState({
              task: newArr
          })
      })
}

onCellEdit=(row, fieldName, value)=>{
    
    console.log(value)
    let obj={
        status: value,
        date: moment().format("MM/DD/YY"),
        proj_id: this.props.proj_id
    }
        
    axios.put(`/api/updateTask/${row.id}`,obj)
         .then(response=>{
            let ID = 0 
            let newArr=response.data.map(element=>{
               ID++
                   return{
                       ...element, ID: ID
                   }   
               })
               const toast = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
              
              this.setState({
                  task:newArr
              })
              toast({
                type: 'success',
                title: 'Signed in successfully'
              })
         })
}
  render() {
    return (
      <BootstrapTable data={ this.state.task } striped hover condensed
                      remote={ true }           
                      options={{ noDataText:'No Task Assigned',onCellEdit: this.onCellEdit,}}
                      cellEdit={{mode: 'click',blurToSave:true }}
                     
                      >
        <TableHeaderColumn  dataField="ID" isKey={true}>Task ID</TableHeaderColumn>
        <TableHeaderColumn editable={false} dataField="name" >Task Name</TableHeaderColumn>
        <TableHeaderColumn width="150px" editable={false} dataField="description" >Task Desription</TableHeaderColumn>
        <TableHeaderColumn  editable={false} dataField="assigned_date" >Assigned Date</TableHeaderColumn>
        <TableHeaderColumn editable={false} dataField="complete_date" >Complete Date</TableHeaderColumn>
        <TableHeaderColumn editable={{type:'select', options:{values: ['PENDING','COMPLETED']}}} dataField="status">Status</TableHeaderColumn>   
      </BootstrapTable>
    )
  }
}

export default UserTable;
