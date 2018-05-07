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
    const { leaveLifeCycle } = this.props;
    return(
      <div>
        
        { leaveLifeCycle ? <Timeline>
          {
            leaveLifeCycle.map((lifeCycleEvent, index) => {
              console.log(lifeCycleEvent);
              return <TimelineEvent key={index}
                                    title={
                                      lifeCycleEvent.status == "pending" && <b>PENDING</b> ||
                                      lifeCycleEvent.status == "approved by Reporting to" && <b>PENDING ON HR</b> ||
                                      lifeCycleEvent.status == "approved by HR" && <b>APPROVED</b> ||
                                      lifeCycleEvent.status == "rejected by Reporting to" && <b>REJECTED BY REPORTING TO</b> ||
                                      lifeCycleEvent.status == "rejected by HR" && <b>REJECTED BY HR</b>
                                    }
                                    createdAt={moment(lifeCycleEvent.created_at).format("Do MMMM YYYY, h:mm a")}
                                    icon={
                                      lifeCycleEvent.status == "pending" && <HourglassFull/> ||
                                      lifeCycleEvent.status == "approved by Reporting to" && <HourglassFull/> ||
                                      lifeCycleEvent.status == "approved by HR" && <ThumbUp/> ||
                                      lifeCycleEvent.status == "rejected by Reporting to" && <ThumbDown/> ||
                                      lifeCycleEvent.status == "rejected by HR" && <ThumbDown />
                                    }
                                    iconColor={
                                      lifeCycleEvent.status == "pending" && "#D8D739" ||
                                      lifeCycleEvent.status == "approved by Reporting to" && "#9AD891" ||
                                      lifeCycleEvent.status == "approved by HR" && "#2CD81F" ||
                                      lifeCycleEvent.status == "rejected by Reporting to" && "#D87D72" ||
                                      lifeCycleEvent.status == "rejected by HR" && "#D84D30"
                                    }
              >
                {lifeCycleEvent.comment}
              </TimelineEvent>
            })
          }
        </Timeline> : <span>Sorry! Unable to load Timeline</span>}
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