import React, {
    Component
} from 'react'
import './Project.css'

class Project extends Component {
    render() {
        return (
            <div className="content">
                <div className="main-content">
                    <div className="content-header">
                        <div className="content-title">
                            <h2>Project Name Goes Here</h2>
                        </div>
                        <div className="title-menus">
                            <div className="title-img">
                            <img src="http://via.placeholder.com/50x50" alt="Avatar"/>
                            <img src="http://via.placeholder.com/50x50" alt="Avatar"/>
                            </div>
                            <div className="title-button">
                            <button className="invite-button">Invite some people</button>
                            </div>
                        </div>
                    </div>
                    <div className="content-body">
                    <div className="content-grid">
                        <div className="content-card">
                            <div className="card-title">
                                <p>Schedule</p>
                            </div>
                            <div className="card-img">
                            <img src="https://image.flaticon.com/icons/svg/149/149375.svg" 
                            height="100" width="100" />
                            </div>
                        </div>
                        <div className="content-card">
                            <div className="card-title">
                            <p>Task</p>
                            </div>
                            <div className="card-img">
                            <img src="https://image.flaticon.com/icons/svg/839/839860.svg" 
                            height="100" width="100" />
                            </div>
                            </div>
                            <div className="content-card">
                            <div className="card-title">
                            <p>Message</p>
                            </div>
                            <div className="card-img">
                            <img src="https://www.flaticon.com/premium-icon/icons/svg/546/546807.svg" 
                            height="100" width="100" />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Project;