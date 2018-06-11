// ##############################
// // // Header styles
// #############################

import {
  container,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor
} from "variables/styles";

const headerStyle = theme => ({
  appBar: {
    backgroundColor: "#FFFFFF",
    borderBottom: "0",
    marginBottom: "0",
    position: "sticky",
    height: '70px',
    width: "100%",
    zIndex: "1029",
    color: "#555555",
    border: "0",
    borderRadius: "3px",
    paddingBottom: "20px",
    transition: "all 150ms ease 0s",
    minHeight: "70px",
    display: "block"
  },
  container,
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    top: "10px",
    "&:hover,&:focus": {
      background: "transparent"
    }
  },
  appResponsive: {
    top: "8px"
  },
  primary: {
    backgroundColor: primaryColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: infoColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: successColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: warningColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: dangerColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  }
});

export default headerStyle;
