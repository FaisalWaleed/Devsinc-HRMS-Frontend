import React from 'react';
import Dialog from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import { connect } from 'react-redux';
import * as types from '../../actions/actionTypes';
import { withStyles } from 'material-ui/styles';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = {
  appBar: {
    position: 'relative',
    marginBottom: '30px'
  },
  flex: {
    flex: 1,
  },
};

class ContentModal extends React.Component {
  render() {
    const {classes, open, handleClose, fullscreen, title, content } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth={'md'}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          fullScreen={fullscreen ? fullscreen : false}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                {title}
              </Typography>
              <IconButton color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {content}
        </Dialog>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return({
    handleClose: () => { dispatch({type: types.HIDE_MODAL}) }
  })
}

function mapStateToProps(state) {
  return state.modals.modalProps;
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ContentModal));
