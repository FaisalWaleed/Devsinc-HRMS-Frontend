import React from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../api/user'
import { getProfileSuccess, getProfileFailure} from "../../actions/user";
import Paper from 'material-ui/Paper';
import { Grid } from 'material-ui';
import { ItemGrid, ProfileCard, Muted } from 'components';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Avatar from 'material-ui/Avatar';
import Tooltip from 'material-ui/Tooltip';

const styles = (theme) => ({
  avatar: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '80px',
    height: '80px',
    marginRight: '20px'
  },
  tooltip:{
    fontSize: '18px',
  }

});

class Profile extends React.Component{

  componentDidMount() {
    this.props.getProfile(this.props.match.params.id, getProfileSuccess, getProfileFailure );
  }

  render(){
    const { user, classes, currentUserId } = this.props;
    return(
      user ?
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <Paper>
              <Grid container justify="center">
                <ItemGrid xs={12} sm={12} md={6}>
                  <ProfileCard
                    title={user.name}
                    subtitle={`${user.title} at Devsinc`}
                    avatar={user.image}
                    description={"Some description about this user will be here. User will introduce themselves in 2-3 lines max. Some extra text for demonstration. Some extra text for demonstration. Some extra text for demonstration."}
                    footer={currentUserId === user.id ? <Link to="/users/profile">Edit Profile</Link> : null}
                  />
                </ItemGrid>
              </Grid>
              <br />
              <Grid container>
                <ItemGrid xs={1} sm={1} md={1} />
                <ItemGrid xs={10} sm={10} md={5}>
                  <label>Email Address: </label>
                  <span>{user.email}</span>
                  <br />
                  <label>Contact Number: </label>
                  <span>{user.contact_number}</span>
                  <br />
                  <label>Secondary Contact Number: </label>
                  <span>{user.secondary_contact_number}</span>
                  <br />
                  <label>Birthday: </label>
                  <span>{moment(user.dob).format("Do MMMM")}</span>
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={5}>
                  <label>Manager: &nbsp;&nbsp;</label>
                  <Tooltip classes={{tooltip: classes.tooltip}} title={<div>{user.manager.name}</div>} placement="right">
                    <Link to={`/people/${user.manager.id}`}>
                      <Avatar className={classes.avatar} src={user.manager.image}/>
                    </Link>
                  </Tooltip>
                </ItemGrid>
                <ItemGrid xs={1} sm={1} md={1} />
              </Grid>
              <br />
              <Grid container>
                <ItemGrid xs={1} sm={1} md={1} />
                <ItemGrid xs={10} sm={10} md={10}>
                  <h3>Team Members</h3>
                  {
                    user.team_members.length ?
                      user.team_members.map((member, index) => (
                        <Tooltip classes={{tooltip: classes.tooltip}} title={member.name} >
                          <Link to={`/people/${member.id}`}>
                            <Avatar className={classes.avatar} src={member.image}/>
                          </Link>
                        </Tooltip>
                      ))
                      : <Muted>No Team Members</Muted>
                  }
                </ItemGrid>
                <ItemGrid xs={1} sm={1} md={1} />
              </Grid>
              <br /><br /><br />
            </Paper>
          </ItemGrid>
        </Grid>
        : <h1>404: Not Found</h1>
    )
  }
}

function mapStateToProps(state,ownProps){
  return {
    user: state.users.allUserProfiles[ownProps.match.params.id],
    currentUserId: state.reduxTokenAuth.currentUser.attributes.id
  }
}

function mapDispatchToProps(dispatch){
  return {
    getProfile: (params) => { dispatch(getProfile(params, getProfileSuccess, getProfileFailure )) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Profile))