import React, { Component } from 'react'

import './Homepage.css'

export default function Homepage (){
  
 return (
     <div className="welcome-page">

        <video autoPlay muted loop id="myVideo">

          <source src="https://res.cloudinary.com/dvwws6e4w/video/upload/v1530245909/Blurry_Video_Of_People_Working.mp4"/>
          Your browser does not support HTML5 video.
        </video>

            <div className="welcome-wrapper">
              <div className="welcome-greeting">
                  <h1>Welcome</h1>
              </div>
              <div className="login-button">
                <a href={process.env.REACT_APP_LOGIN}>Login </a>
               </div> 
            </div>
    </div>
    )
  } 


