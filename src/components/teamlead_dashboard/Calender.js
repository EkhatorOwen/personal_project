import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import Button from './Button'
import 'react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.momentLocalizer(moment);

export default class Calendar extends Component {
    constructor(){
        super();
        this.state={
            events: [],
            addEvent: false
        }
    }

    componentDidMount(){
        // const CALENDAR_ID = 'qlti16i9bd6f770k7ddqbnqb04@group.calendar.google.com'
        // const API_KEY = 'AIzaSyCwxvF1cnObuETDts-TPLDXBxZbNwkOjmY' 
        // axios.get(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`)
        //      .then(response=> console.log(response.data.items))
    }

    addEvent= ()=>{

   }

   showFields=()=>{
       this.setState(
           prevState=>({
                addEvent: !prevState.addEvent
           })
       )
   }

  render() {
  
      let events = [
          {
        id: 0,
        title: 'All Day Event very long title',
        allDay: true,
        start: moment('2018-6-16'),
        end: moment('2018-6-16'),
    },
    {
        id: 1,
        title: 'All Day Event v title',
        allDay: true,
        start: moment('2018-7-16'),
        end: moment('2018-7-19'),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
    },

]
    return (
      <div>
        <BigCalendar
       
        style={{height: '420px',
                margin: '40px'
                             }}
        events={events}
      
        />
        { this.state.addEvent &&
        <form onSubmit={this.addEvent}>
        <label>Title:</label>
        <input/>
        <label>start date YYYY-MM-DD:</label>
        <input/>
        <label>End Date YYYY-MM-DD</label>
        <input/>
        <Button
        bgColor="blue"
        label="Add"
        type="submit"
        />
        </form>
        }
      <Button
      bgColor="green"
      label="Add Event"
      type={null}
      method={this.showFields}
      />
      </div>
    )
  }
}
