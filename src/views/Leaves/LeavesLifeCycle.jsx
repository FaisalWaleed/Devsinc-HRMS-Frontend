import React from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import { ThumbUp, ThumbDown, HourglassFull } from 'material-ui-icons'
import { connect } from 'react-redux';
import {fetchLeaveLifeCycleFailure, fetchLeaveLifeCycleSuccess} from "../../actions/leave";
import { fetchLeaveLifeCycle } from "../../api/leave";
import * as moment from 'moment';

class LeavesLifeCycle extends React.Component{
  
  componentDidMount(){
    this.props.fetchLeaveLifeCycle({leave_id: parseInt(this.props.leaveId)})
  }
  
  render(){
    const { leaveLifeCycle, reason } = this.props;
    return(
      <div>
        
        { leaveLifeCycle && <Timeline>
          {
            leaveLifeCycle.map((lifeCycleEvent, index) => {
              return <TimelineEvent key={index}
                                    title={
                                      lifeCycleEvent.status == "pending" && <b>PENDING</b> ||
                                      lifeCycleEvent.status == "approved" && <b>APPROVED</b> ||
                                      lifeCycleEvent.status == "rejected" && <b>REJECTED BY HR</b>
                                    }
                                    createdAt={moment(lifeCycleEvent.created_at).format("Do MMMM YYYY, h:mm a")}
                                    icon={
                                      lifeCycleEvent.status == "pending" && <HourglassFull/> ||
                                      lifeCycleEvent.status == "approved" && <ThumbUp/> ||
                                      lifeCycleEvent.status == "rejected" && <ThumbDown />
                                    }
                                    iconColor={
                                      lifeCycleEvent.status == "pending" && "#D8D739" ||
                                      lifeCycleEvent.status == "approved" && "#2CD81F" ||
                                      lifeCycleEvent.status == "rejected" && "#D84D30"
                                    }
              >
                {lifeCycleEvent.status == "pending" ? reason : lifeCycleEvent.comment}
              </TimelineEvent>
            })
          }
        </Timeline> }
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchLeaveLifeCycle: (params) => dispatch(fetchLeaveLifeCycle(params,fetchLeaveLifeCycleSuccess,fetchLeaveLifeCycleFailure))
  }
}

function mapStateToProps(state, ownProps){
  return {
    leaveLifeCycle: state.leaves.allLeavesLifecycle[ownProps.leaveId]
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LeavesLifeCycle);