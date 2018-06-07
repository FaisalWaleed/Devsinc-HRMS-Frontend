import React from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../api/user'
import { getProfileSuccess, getProfileFailure} from "../../actions/user";

class Profile extends React.Component{
  
  
  componentDidMount() {
    this.props.getProfile(this.props.match.params.id, getProfileSuccess, getProfileFailure );
  }
  
  render(){
    return(
      <h1>I am Profile page</h1>
    )
  }
}

function mapStateToProps(state,ownProps){
  console.log("id",ownProps.match.params.id)
  return {
    profile: state.users.allUserProfiles[ownProps.match.params.id]
  }
}

function mapDispatchToProps(dispatch){
  return {
    getProfile: (params) => { dispatch(getProfile(params, getProfileSuccess, getProfileFailure )) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)