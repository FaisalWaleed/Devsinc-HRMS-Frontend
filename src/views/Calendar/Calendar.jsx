import React from "react";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
moment.locale('en-GB');
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer







const allViews = Object
  .keys(BigCalendar.Views)
  .map(k => BigCalendar.Views[k])

class Calendar extends React.Component {

  eventStyleGetter(event, start, end, isSelected){
    console.log(event);
    var backgroundColor = '#' + event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return {
      style: style
    };

  }
  render(){
    return (
      <div style={{ height: 700 }}>
        <BigCalendar
          events={events}
          step={60}
          views={allViews}
          defaultDate={new Date()}
          onSelectSlot={(this.slotSelected)}
          onSelectEvent={(this.eventSelected)}
          eventPropGetter={(this.eventStyleGetter)}
        />
      </div>
    );
  }
}

export default Calendar;
