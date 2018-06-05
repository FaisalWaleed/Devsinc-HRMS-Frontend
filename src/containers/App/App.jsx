import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles } from "material-ui";
import { Header, Footer, Sidebar, ErrorBoundary, Snackbar } from "components";
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
import Unauthorized from "../../views/Errors/Unauthorized";
import { hasPermission } from "../../helpers/permissionsHelper";
import { closeNotification } from "../../actions/notification";
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'
import {toggleSidebar} from "../../actions/sidebar";


const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/login',
});



class App extends React.Component {
  
  handleDrawerToggle = () => {
    this.props.toggleSidebar();
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
    if((!this.checkUnprotectedPages() )){
      this.props.fetchPermissions();
    }
    if(navigator.platform.indexOf('Win') > -1){
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  
  componentDidUpdate() {
    if(this.props.permissions === null){
      this.props.fetchPermissions();
    }
    // this.refs.mainPanel.scrollTop = 0;
  }
  
  render() {
    const { classes, notification, closeNotification, permissions, sidebarOpen, sidebarMin, isLoading, ...rest } = this.props;
    const switchRoutes = (
      <Switch>
        {
          appRoutes.map((prop, key) => {
            if (prop.redirect)
              return <Redirect from={prop.path} to={prop.to} key={key} />;
            else if(prop.unprotected)
              return <Route path={prop.path} component={prop.component} key={key} exact={prop.exact} />;
            else
              return <Route
                key={key}
                path={prop.path}
                component={
                  hasPermission(permissions, prop.requiredPermissions, prop.atleastOnePerm)
                    ? requireSignIn(prop.component)
                    : requireSignIn(Unauthorized)
                }
                exact={prop.exact} />
          })
        }
      </Switch>
    );
    return (
      <ErrorBoundary>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <div>
            <ModalRoot />
            { isLoading
              ?
              <OverlayLoader
                color={'#16bbb2'} // default is white
                loader="PacmanLoader" // check below for more loaders
                text="Please wait . . ."
                active={true}
                backgroundColor={'black'} // default is black
                opacity=".9" // default is .9
              >
                <div style={{height: '100vh'}} />
              </OverlayLoader>
              :
              <div className={classes.wrapper}>
                {
                  this.checkUnprotectedPages() ? null :
                    <Sidebar
                      routes={appRoutes}
                      logo={logo}
                      image={image}
                      handleDrawerToggle={this.handleDrawerToggle}
                      open={sidebarOpen}
                      color="blue"
                      min={sidebarMin}
                      {...rest}
                    />
                }
                
                <div className={sidebarOpen ? classes.mainPanel : classes.mainPanelExpanded } ref="mainPanel">
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
                      <Snackbar
                        place={notification.place}
                        color={notification.color}
                        icon={notification.icon}
                        message={notification.message}
                        open={notification.open}
                        closeNotification={closeNotification}
                        close
                      />
                    </div>
                  ) : (
                    <div className={classes.map}>{switchRoutes}</div>
                  )}
                  {this.checkLoginPath() ? null : <Footer />}
                </div>
              </div>
            }
          </div>
        </MuiPickersUtilsProvider>
      </ErrorBoundary>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state){
  return {
    sidebarMin: state.sidebar.min,
    sidebarOpen: state.sidebar.open,
    permissions: state.permissions.userPermissions,
    notification: state.notification,
    isSignedIn: state.reduxTokenAuth.currentUser.isSignedIn,
    isLoading: state.reduxTokenAuth.currentUser.isLoading,
  }
}

function mapDispatchToProps(dispatch){
  return {
    closeNotification: () => { dispatch(closeNotification()) },
    fetchPermissions: () => {dispatch(fetchPermissions(fetchPermissionSuccess,fetchPermissionFailure)) },
    toggleSidebar: () => { dispatch(toggleSidebar()) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(appStyle)(App));
