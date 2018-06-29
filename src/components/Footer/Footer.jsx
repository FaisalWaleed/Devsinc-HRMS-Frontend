import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui";

import footerStyle from "variables/styles/footerStyle";

function Footer({ ...props }) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          {/*<List className={classes.list}>*/}
            {/*<ListItem className={classes.inlineBlock}>*/}
              {/*<a href="#home" className={classes.block}>*/}
                {/*Home*/}
              {/*</a>*/}
            {/*</ListItem>*/}
            {/*<ListItem className={classes.inlineBlock}>*/}
              {/*<a href="#company" className={classes.block}>*/}
                {/*Company*/}
              {/*</a>*/}
            {/*</ListItem>*/}
            {/*<ListItem className={classes.inlineBlock}>*/}
              {/*<a href="#portfolio" className={classes.block}>*/}
                {/*Portfolio*/}
              {/*</a>*/}
            {/*</ListItem>*/}
            {/*<ListItem className={classes.inlineBlock}>*/}
              {/*<a href="#blog" className={classes.block}>*/}
                {/*Blog*/}
              {/*</a>*/}
            {/*</ListItem>*/}
          {/*</List>*/}
        </div>
        <p className={classes.right}>
          <span>
            <a target="_blank" rel="noopener noreferrer" href="http://devsinc.com" className={classes.a}>
              Developers Incorporate
            </a>
            &nbsp;
            &copy; {1900 + new Date().getYear()}
          </span>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
