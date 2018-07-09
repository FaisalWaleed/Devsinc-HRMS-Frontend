import React from "react";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Grid } from 'material-ui';
import { ItemGrid } from 'components';
import { GOOGLE_CALENDAR_API_KEY } from "../../config/apiConfig";
import Paper from 'material-ui/Paper';

BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      events: []
    }
  }
  
  componentDidMount(){
    this.getPublicHolidays();
  }
  
  getPublicHolidays(){
    fetch(`https://www.googleapis.com/calendar/v3/calendars/en.pk%23holiday%40group.v.calendar.google.com/events?key=${GOOGLE_CALENDAR_API_KEY}`)
      .then((response) => ( response.json()))
      .then((jsonRes) => {
        if(jsonRes.items !== undefined)
          this.setState({events: jsonRes.items });
      })
      .catch((error) => console.log(error));
  }
  
  eventStyleGetter(event, start, end, isSelected){
    
    return {
      style: {
        backgroundColor: "#94f98f",
        borderRadius: '20px',
        color: 'black',
        border: '2px solid #eee',
        display: 'block'
      }
    };
  }
  render(){
    console.log(this.state.events);
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <Paper>
            <div style={{ height: 700 }}>
              <BigCalendar
                popup
                events={this.state.events}
                startAccessor={(event) => moment(event.start.date).toDate()}
                endAccessor={(event) => moment(event.end.date).toDate()}
                titleAccessor="summary"
                views={["day","month","week"]}
                defaultDate={new Date()}
                eventPropGetter={(this.eventStyleGetter)}
              />
            </div>
          </Paper>
        </ItemGrid>
      </Grid>
    );
  }
}

export default Calendar;
