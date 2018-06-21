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
            addEvent: false,
            startDate: '',
            endDate: '',
            title: ''
        }
    }

    componentDidMount(){
        const CALENDAR_ID = 'qlti16i9bd6f770k7ddqbnqb04@group.calendar.google.com'
        const API_KEY = 'AIzaSyCwxvF1cnObuETDts-TPLDXBxZbNwkOjmY' 
        axios.get(`/api/getEvents/${this.props.match.params.id}`)
        .then(response=>{
            let arr2 = [];
            let arr = this.state.events.slice();
            //arr.push(...response.data)
            let result =  response.data.map(element=>{
                return   {  
                    title: element.title,
                    end: moment(element.end).toDate(),
                    start: moment(element.start).toDate()
                }
            })
            arr2.push(...result)
            this.setState({events: arr2})
            
            axios.get(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`)
                 .then(response=> {
                    if(response.data.items){
                     let event =   response.data.items.map(element=>{
                         
                            return {
                                title: element.summary,
                                start: moment(element.start.date).toDate(),
                                end: moment(element.end.date).toDate(), 
                            }
                        })
                       
                        let arr = this.state.events.slice()
                        arr.push(...event)
                        this.setState({events: arr})
                    } 
                })
                    
                    })


    }

    addEvent= (e)=>{
        e.preventDefault()  

        //add event to calendar  
        let date ={
                title: this.state.title,
                start: moment(this.state.startDate).toDate(),
                end: moment(this.state.endDate).toDate(),
        }

        let events = this.state.events.slice()
            events.push(date)
            this.setState({events: events})
            
            //save calendar to database
                
            let obj ={
                projId: this.props.match.params.id,
                ...date
            }

            axios.post('/api/addEvent',obj)
                  .then(response=>console.log(response.data))
   }

   showFields=()=>{
       this.setState(
           prevState=>({
                addEvent: !prevState.addEvent
           })
       )
   }

   onChange=(e)=>{
    this.setState({
        [e.target.name]: e.target.value
    })
   }

  render() {
  
    return (
      <div>
        <BigCalendar
        style={{height: '420px',
                margin: '40px'
                             }}
        events={this.state.events}  
        />

        { this.state.addEvent &&
        <form onSubmit={this.addEvent}>
        <label>Title:</label>
        <input value={this.state.title} name="title" onChange={this.onChange}/>
        <label>start date </label>
        <input value={this.state.startDate} type="datetime-local" name="startDate" onChange={this.onChange}/>
        <label>End Date</label>
        <input value={this.state.endDate} type="datetime-local" name="endDate" onChange={this.onChange}/>
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
