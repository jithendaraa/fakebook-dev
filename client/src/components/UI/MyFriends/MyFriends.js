import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import Spinner from '../Spinner/Spinner';

// import io from 'socket.io-client';


// const socketUrl = io('http://localhost:5000');
// let onlineUsers;
// const socket = io(socketUrl);

// socket.on('online users', (onlineUsers) => {
//   // console.log(onlineUsers);
//   console.log(onlineUsers)
// })


const styles = theme => ({
  typography: {
    padding: theme.spacing(2),
  },
});

class MyFriends extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    online: []
  };




  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
    return;
  };

  async componentDidMount(){
    await this.props.getMyFriends(this.props.auth.myFriends);
    return;
  }

  renderFriends() {
    const { classes } = this.props;
    if(this.props.myFriends.length === 0){
        return (<div>No friends</div>);
    }
    else if(this.props.myFriends === undefined){
      return (<Spinner />)
    }
    else if(this.props.myFriends.length >= 1){
        return this.props.myFriends.map(myFriend => {
            return (
                <div key={myFriend._id}>
                    <Typography className={classes.typography}>{myFriend.displayName} <b>{myFriend.email}</b> </Typography>
                </div>
            )
        })
    }
    else{
        return (<Spinner />)
    }
}

  render() {
    // const { classes } = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? 'simple-popper' : null;

    return (
      <div>
        <Button aria-describedby={id} variant="contained" onClick={this.handleClick}>
          My Friends({this.props.myFriends.length})
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                {this.renderFriends()} 
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    );
  }
}

MyFriends.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    myFriends: state.myFriends
  }
}

export default withStyles(styles)(connect(mapStateToProps, actions)(MyFriends));