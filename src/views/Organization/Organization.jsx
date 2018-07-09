import React from 'react';
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';
import { connect } from 'react-redux';
import { fetchOrganoChartJson } from "../../api/user";
import { fetchOrganoChartFailure, fetchOrganoChartSuccess } from "../../actions/user";
import Paper from 'material-ui/Paper';
import Node from './Node';
// import './organo-chart-custom.css'

class Organization extends React.Component{
  
  componentDidMount(){
    this.props.fetchOrganoChartJSON();
  }
  
  render(){
    const { organoChartJSON } = this.props;
  
    return(
      <Paper style={{padding: '20px'}}>
        {
          organoChartJSON
            ? <div id="organochart"><OrgChart tree={organoChartJSON} NodeComponent={Node} /></div>
            : null
        }
      </Paper>
    )
  }
  
}

function mapStateToProps(state){
  return {
    organoChartJSON: state.users.organoChartJSON
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchOrganoChartJSON: () => dispatch(fetchOrganoChartJson(fetchOrganoChartSuccess,fetchOrganoChartFailure))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Organization);