import React from "react";
import { connect } from 'react-redux';
import ProfileForm from './ProfileForm';
import { 
  getProfile, 
  updateProfile 
} from "api/user";

import { 
  getProfileSuccess, 
  getProfileFailure, 
  updateProfileSuccess, 
  updateProfileFailure 
} from "actions/user";

class EditProfile extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch, userId } = this.props;
    dispatch(getProfile(userId, getProfileSuccess, getProfileFailure ));
  }

  handleSubmit(values){
    const { dispatch, userId } = this.props;

    dispatch(updateProfile(values, userId, updateProfileSuccess, updateProfileFailure));
  }

  render(){
    const { userId } = this.props;
    return (
          <ProfileForm user_id={userId} onSubmit={this.handleSubmit} />
    );
  }
}

const mapStateToProps = ({ reduxTokenAuth: { currentUser: { attributes: { id }} }, users: { profileUpdated }  }) => ({
  userId: id,
  profileUpdated
});

export default connect(mapStateToProps, null)(EditProfile);
