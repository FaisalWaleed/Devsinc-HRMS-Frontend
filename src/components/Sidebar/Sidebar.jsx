import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import cx from "classnames";
import {
  withStyles,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "material-ui";
import { HeaderLinks } from "components";
import sidebarStyle from "variables/styles/sidebarStyle.jsx";
import { connect } from 'react-redux';
import {hasPermission} from "../../helpers/permissionsHelper";

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  const { classes, color, logo, image, logoText, routes, open, min } = props;
  var links = (
    <List className={classes.list}>
      {
        routes.map((prop, key) => {
        if (prop.redirect || prop.unprotected || prop.notSidebar) return null;
        const listItemClasses = cx({
          [" " + classes[color]]: activeRoute(prop.path)
        });
        const whiteFontClasses = cx({
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });
        return (
          hasPermission(props.permissions,prop.requiredPermissions,prop.atleastOnePerm) ?
            <NavLink
              to={prop.path}
              className={classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                {
                  open
                    ?
                    <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                      <prop.icon />
                    </ListItemIcon>
                    : null
                }

                {
                  open ?
                  <ListItemText
                    primary={prop.sidebarName}
                    className={classes.itemText + whiteFontClasses}
                    disableTypography={true}
                  />
                  : <ListItemText
                      primary={<prop.icon />}
                      className={classes.itemText + whiteFontClasses}
                      disableTypography={true}
                    />
                }
              </ListItem>
            </NavLink>
            : null
        );
      })}
    </List>
  );
  var brand = (
    open ?
    <div className={classes.logo}>
      <a onClick={props.handleDrawerToggle} className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
      :
      <div className={classes.logo}>
        <a onClick={props.handleDrawerToggle} className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
          {logoText}
        </a>
      </div>
  );
  return (
    <div>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <HeaderLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        {open ?
          <Drawer
            anchor="left"
            variant="persistent"
            open={open}
            onClose={props.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>{links}</div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{backgroundImage: "url(" + image + ")"}}
              />
            ) : null}
          </Drawer>
          :
          <Drawer
            anchor="left"
            variant="persistent"
            open={min}
            onClose={props.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>{links}</div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{backgroundImage: "url(" + image + ")"}}
              />
            ) : null}
          </Drawer>
        }
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state){
  return {
    permissions: state.permissions.userPermissions
  }
}

export default connect(mapStateToProps,null)(withStyles(sidebarStyle)(Sidebar));
