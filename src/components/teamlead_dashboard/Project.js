import React, {
    Component
} from 'react'
import './Project.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Pictures from './Pictures';

class Project extends Component {
    constructor(){
        super()
        this.state={
            projectName: '',
            id: '',
            people: []
        }
    }
    
    componentDidMount(){
        let routeid = this.props.match.params.id;
        let projects = this.props.GetProject.projects;
        let currentProject = projects.filter(elem=>elem.id==routeid)
        let projName = currentProject[0].name
        this.setState({ projectName: projName,
                        id: routeid })
        axios.get(`/api/project/pictures/${routeid}`)
              .then(response=>this.setState({
                        people: response.data
              }))
    }

  
    render() {
            let images = this.state.people.map((element,index)=>{
                
              return  (<Pictures
                    key={index}
                    element={element}
                />)
            })
        return (
            <div className="content">
          {this.props.GetProject.isLoading&&(
                <img
              src="https://zippy.gfycat.com/SkinnySeveralAsianlion.gif"
              alt="loader"/>
                    )}
                <div className="main-content">
                    <div className="content-header">
                        <div className="content-title">
                            <h2>{this.state.projectName}</h2>
                        </div>
                        <div className="title-menus">


                            {images}

                            {this.props.ViewProfile.isLead&& <div className="title-button">
                           <Link to={`/dashboard/project/${this.state.id}/people`}> <button className="invite-button">Add/Remove</button></Link>
                            </div>}
                        </div>
                    </div>
                    <div className="content-body">
                    <div className="content-grid">

                     <Link to={`/dashboard/project/${this.state.id}/schedule`}>  <div className="content-card">
                       
                     <div className="card-title">
                                <p>Schedule</p>
                            </div>
                            <div className="card-img">
                            <img src="https://image.flaticon.com/icons/svg/149/149375.svg" 
                            height="100" width="100" />
                            </div>
                        </div> </Link>


                       <Link to={`/dashboard/project/${this.state.id}/viewtask`}><div className="content-card">
                            <div className="card-title">
                            {this.props.ViewProfile.isLead?(<p>Manage Task</p>):(<p>View Task</p>)}
                            </div>
                            <div className="card-img">
                            <img src="https://image.flaticon.com/icons/svg/839/839860.svg" 
                            height="100" width="100" />
                            </div>
                            </div></Link>

                      <Link to={`/dashboard/project/${this.state.id}/messageboard`}><div className="content-card">
                            <div className="card-title">
                            <p>Message Board</p>
                            </div>
                            <div className="card-img">
                            <img src="https://www.flaticon.com/premium-icon/icons/svg/546/546807.svg" 
                            height="100" width="100" />
                            </div>
                          </div> </Link>

                      {this.props.ViewProfile.isLead&&(<Link to={`/dashboard/project/${this.state.id}/vizuals`}><div className="content-card">
                          <div className="card-title">
                          <p>Visuals</p>
                          </div>
                          <div className="card-img">
                          <img src="https://image.flaticon.com/icons/svg/263/263066.svg" 
                          height="100" width="100" />
                          </div>
                        </div> </Link>)}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state =>{
    return {GetProject: state.GetProject,
            ViewProfile: state.ViewProfile    }
  }
  
  export default connect(mapStateToProps,null)(Project)
  