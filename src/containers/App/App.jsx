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
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'

const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/login',
});

const switchRoutes = (
  <Switch>
    {appRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return prop.unprotected
        ? <Route path={prop.path} component={prop.component} key={key} exact={prop.exact} />
        : <Route path={prop.path} component={requireSignIn(prop.component)} key={key} exact={prop.exact} />;
    })}
  </Switch>
);

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
  
  componentDidMount() {
    if(navigator.platform.indexOf('Win') > -1){
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentDidUpdate() {
    if(!this.checkLoginPath() && localStorage.getItem("permissions") === null){
      //send call here and get perms
      console.log("No perms found")
    }
    this.refs.mainPanel.scrollTop = 0;
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div>
          <ModalRoot />
          <div className={classes.wrapper}>
            {this.checkLoginPath() ? null :
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

export default withStyles(appStyle)(App);
