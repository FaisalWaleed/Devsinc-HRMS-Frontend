// ##############################
// // // Dashboard styles
// #############################

import { successColor } from "variables/styles";

const dashboardStyle = {
  successText: {
    color: successColor
  },
  upArrowCardCategory: {
    width: 14,
    height: 14
  },
  paper: {
    width: '100%',
    padding: '1.5%',
    marginBottom: '8vh'
  },
  avatar: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '80px',
    height: '80px',
    marginRight: '20px'
  },
  tooltip:{
    fontSize: '18px',
  },
  center:{
    width: '100%',
    textAlign: 'center'
  },
  subHeading:{
    paddingBottom: '-90px',
    display: 'block',
    marginBottom: '20px'
  },
  subHeadingText:{
    fontSize: '18px',
    textDecoration: 'underline'
  }
};

export default dashboardStyle;
