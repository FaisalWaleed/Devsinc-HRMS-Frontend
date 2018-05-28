import React from 'react';
import { connect } from 'react-redux';
import SmartDataTable from 'react-smart-data-table';
import { fetchAllLeaves } from "../../api/leave";
import {fetchAllLeavesFailure, fetchAllLeavesSuccess} from "../../actions/leave";

class LeaveAdminTab extends React.Component{
  
  componentDidMount(){
    this.props.fetchAllLeaves();
  }
  
  render(){
    const { allLeaves } = this.props;
    return(
      <SmartDataTable
        filterValue={"Account Owner"}
        data={allLeaves}
        name="Test"
        className={"table"}
        sortable
      />
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchAllLeaves: () => { dispatch(fetchAllLeaves(fetchAllLeavesSuccess,fetchAllLeavesFailure)) }
  }
}

function mapStateToProps(state){
  return {
    allLeaves: state.leaves.allLeaves
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LeaveAdminTab);