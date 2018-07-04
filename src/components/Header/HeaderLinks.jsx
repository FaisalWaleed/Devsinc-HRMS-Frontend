import React from "react";
import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
import {
  withStyles,
  IconButton,
  MenuItem,
  MenuList,
  Grow,
  Paper,
  ClickAwayListener,
  Hidden
} from "material-ui";
import { Person } from "material-ui-icons";
import headerLinksStyle from "variables/styles/headerLinksStyle";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutUser } from '../../actions/auth/authConfig';


class HeaderLinks extends React.Component {
  constructor(props){
    super(props);
    this.signOut = this.signOut.bind(this);
  }
  
  state = {
    open: false
  };
  
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  
  handleClose = () => {
    this.setState({ open: false });
  };
  
  signOut(){
    return this.props.signOutUser().then( () => {
      window.location = '/login';
    });
  }
  
  render() {
    const { classes, profile } = this.props;
    const { open } = this.state;
    return (
      <div>
        <br/>
        <Manager style={{ display: "inline-block" }}>
          <Target>
            <IconButton
              color="inherit"
              aria-label="Notifications"
              aria-owns={open ? "menu-list" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.buttonLink}
            >
              <Person className={classes.links} />
              <Hidden mdUp>
                <p onClick={this.handleClick} className={classes.linkText}>
                  {profile.first_name} {profile.last_name}
                </p>
              </Hidden>
            </IconButton>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={open}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      <Link to='/profile' >{profile.first_name} {profile.last_name}</Link>
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      <span onClick={this.signOut} >Logout</span>
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    profile: state.reduxTokenAuth.currentUser.attributes
  }
}

export default connect(mapStateToProps,{ signOutUser })(withStyles(headerLinksStyle)(HeaderLinks));
