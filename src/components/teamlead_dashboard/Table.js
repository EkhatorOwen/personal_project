import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { getTask } from '../../ducks/task/GetTaskReducer'
import { getPeople } from '../../ducks/teamMember/GetPeopleReducer'
import { connect } from 'react-redux';
import swal from 'sweetalert2'

import axios from 'axios'

class Table extends React.Component {
    
      onDeleteRow=(next,dropRowKeys)=> {   
          console.log(dropRowKeys[0])
       const newArr= this.props.GetTask.task.filter((element,index)=>{
               return element.ID ===dropRowKeys[0]
              
          })
          
          let id = newArr[0].id     
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
                axios.delete(`/api/deleteTask/${id}`)
                     .then(response=>{
                         console.log(this.props.match)
                         this.props.getTask(this.props.projID)
                         const toast = swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                          });                 
                          toast({
                            type: 'success',
                            title: 'Task Successfully Deleted'
                          })
                     })
            }
          })

    }

      onExportToCSV=()=> {
        return this.props.GetTask.task;
      }

   
  
    render() {
        
      return (
        <BootstrapTable data={ this.props.GetTask.task }
        striped hover condensed
                        exportCSV={ true }
                        remote={ true }
                        deleteRow={ true }
                        selectRow={ { mode: 'radio' } }
                        options={ { handleConfirmDeleteRow:this.onDeleteRow, onExportToCSV: this.onExportToCSV, noDataText:'No Task Assigned',  } }>
          <TableHeaderColumn dataField='ID' isKey={ true }>Task ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Task Name</TableHeaderColumn>
          <TableHeaderColumn  dataField='full_name'>Assigned To</TableHeaderColumn>
          <TableHeaderColumn dataField='assigned_date'>Assigned Date</TableHeaderColumn>
          <TableHeaderColumn dataField='complete_date'>Complete Date</TableHeaderColumn>
          <TableHeaderColumn dataField='status'>Status</TableHeaderColumn>
        </BootstrapTable>
      );
    }
  }

  const mapStateToProps = state=>{
    return{
        GetPeople: state.GetPeople,
        GetProject: state.GetProject,
        GetTask: state.GetTask
    }
  }
  export default connect(mapStateToProps,{getPeople,getTask})(Table)