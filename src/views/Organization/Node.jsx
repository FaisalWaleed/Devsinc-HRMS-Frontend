import React from 'react';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    // border: '1px solid black',
    display: 'block',
    width: '100%'
  },
  container: {
    position: 'relative',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40%',
    // border: '1px solid red',
    minWidth: '250px',
    maxWidth: '300px',
  },
  avatar: {
    position: 'absolute',
    left: '-4px',
    top: '-10px',
    backgroundColor: 'white',
    border: 'solid 3px #16a9a0',
    borderRadius: '30px',
    padding: '3px',
    display: 'inline-block'
  },
  textBox: {
    width: '100%',
    color: 'white',
    backgroundColor: '#16a9a0',
    border: 'solid 3px #16a9a0',
    borderRadius: '0px',
    display: 'inline-block'
  }
};


class Node extends React.Component{
  
  render(){
    const { node, classes } = this.props;
    return(
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.avatar}>
            <Avatar imgProps={{width: '10'}} src={node.image}/>
          </div>
          <div className={classes.textBox}>
            {node.name}
          </div>
        </div>
      </div>
    )
  }
  
}

export default withStyles(styles)(Node);