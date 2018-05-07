import React from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import { ThumbUp, ThumbDown, HourglassFull } from 'material-ui-icons'
import { connect } from 'react-redux';
import {fetchLeaveLifeCycleFailure, fetchLeaveLifeCycleSuccess} from "../../actions/leave";
import { fetchLeaveLifeCycle } from "../../api/leave";

class LeavesLifeCycle extends React.Component{
  
  componentDidMount(){
    this.props.fetchLeaveLifeCycle({leave_id: parseInt(this.props.leaveId)})
  }

  render(){
    return(
      <Timeline>
        <TimelineEvent title="John Doe sent a SMS"
                       createdAt="2016-09-12 10:06 PM"
                       icon={<ThumbUp/>}
                       iconColor="#6fba1c"
        >
          I received the payment for $543. Should be shipping the item within a couple of hours.
        </TimelineEvent>
        <TimelineEvent
          title="You sent an email to John Doe"
          createdAt="2016-09-11 09:06 AM"
          icon={<ThumbDown />}
          iconColor="#ff0000"
        >
          Like we talked, you said that you would share the shipment details? This is an urgent order and so I
          am losing patience. Can you expedite the process and pls do share the details asap. Consider this a
          gentle reminder if you are on track already!
        </TimelineEvent>
        <TimelineEvent
          title="You sent an email to John Doe"
          createdAt="2016-09-11 09:06 AM"
          icon={<HourglassFull />}
          iconColor="rgb(216, 215, 57)"
        >
          Like we talked, you said that you would share the shipment details? This is an urgent order and so I
          am losing patience. Can you expedite the process and pls do share the details asap. Consider this a
          gentle reminder if you are on track already!
        </TimelineEvent>
      </Timeline>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchLeaveLifeCycle: (params) => dispatch(fetchLeaveLifeCycle(params,fetchLeaveLifeCycleSuccess,fetchLeaveLifeCycleFailure))
  }
}

function mapStateToProps(state){
  return {
  
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LeavesLifeCycle);