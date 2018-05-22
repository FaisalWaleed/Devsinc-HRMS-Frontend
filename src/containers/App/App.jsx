import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles } from "material-ui";
import { Header, Footer, Sidebar } from "components";
import ModalRoot from '../../components/Modals/ModalRoot';
import appRoutes from "routes/app.jsx";
import appStyle from "variables/styles/appStyle.jsx";
import image from "assets/img/sidebar.jpg";
import logo from "assets/img/devsinc_logo.png";
import { generateRequireSignInWrapper } from "redux-token-auth";
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { connect } from 'react-redux';
import { fetchPermissions } from '../../api/permission'
import {fetchPermissionFailure, fetchPermissionSuccess} from "../../actions/permission";
import { unprotectedPages } from '../../config/unprotectedPagesConfig';
import { intersection,difference } from 'lodash';
import Unauthorized from "../../views/Unauthorized/Unauthorized";

const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/login',
});



class App extends React.Component {
  state = {
    mobileOpen: false
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  
  checkLoginPath(){
    return this.props.location.pathname === "/login";
  }
  
  checkUnprotectedPages(){
    return unprotectedPages.includes(this.props.location.pathname)
  }
  
  componentDidMount() {
    if(!this.checkUnprotectedPages()){
      this.props.fetchPermissions();
    }
    if(navigator.platform.indexOf('Win') > -1){
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentDidUpdate() {
    // this.refs.mainPanel.scrollTop = 0;
  }
  
  hasPermission(userPermissions, requiredPermissions, hasAnyOnePermission = false){
    if (!userPermissions || !requiredPermissions){
      return false
    }
    if(hasAnyOnePermission){
      return intersection(userPermissions, requiredPermissions).length;
    }
    return difference(requiredPermissions, userPermissions).length === 0;
  }
  
  render() {
    const switchRoutes = (
      <Switch>
        {
          appRoutes.map((prop, key) => {
            if (prop.redirect)
              return <Redirect from={prop.path} to={prop.to} key={key} />;
            else if(prop.unprotected)
              return <Route path={prop.path} component={prop.component} key={key} exact={prop.exact} />;
            else
                return <Route key={key} path={prop.path} component={this.hasPermission(this.props.permissions, prop.requiredPermissions, prop.atleastOnePerm) ? requireSignIn(prop.component) : requireSignIn(Unauthorized)} exact={prop.exact} />
          })
        }
      </Switch>
    );
    const { classes, ...rest } = this.props;
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div>
          <ModalRoot />
          <div className={classes.wrapper}>
            {this.checkUnprotectedPages() ? null :
              <Sidebar
                routes={appRoutes}
                logo={logo}
                image={image}
                handleDrawerToggle={this.handleDrawerToggle}
                open={this.state.mobileOpen}
                color="blue"
                {...rest}
              />
            }
            <div className={classes.mainPanel} ref="mainPanel">
              {this.checkLoginPath() ? null :
                <Header
                  routes={appRoutes}
                  handleDrawerToggle={this.handleDrawerToggle}
                  {...rest}
                />
              }
              {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
              {this.getRoute() ? (
                <div className={classes.content}>
                  <div className={classes.container}>{switchRoutes}</div>
                </div>
              ) : (
                <div className={classes.map}>{switchRoutes}</div>
              )}
              {this.checkLoginPath() ? null : <Footer />}
            </div>
          </div>
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state){
  return {
    permissions: state.permissions.userPermissions
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchPermissions: () => {dispatch(fetchPermissions(fetchPermissionSuccess,fetchPermissionFailure))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(appStyle)(App));
