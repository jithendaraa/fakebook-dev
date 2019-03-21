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


const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2,
  },
});

class MyFriends extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  };

  componentDidMount = async() => {
    const getMyFriends = await this.props.getMyFriends(this.props.auth.myFriends);
  }

  renderFriends() {
    const { classes } = this.props;
    if(this.props.myFriends.length == 0){
        return (<div>No friends</div>);
    }
    else if(this.props.myFriends == undefined){
      return (<div>...Loading</div>)
    }
    else if(this.props.myFriends.length >= 1){
        return this.props.myFriends.map(myFriend => {
            return (
                <div key={myFriend._id}>
                    <Typography className={classes.typography}>{myFriend.displayName} <b>{myFriend.email}</b></Typography>
                </div>
            )
        })
    }
    else{
        return <div>...Loading</div>
    }
}

  render() {
    const { classes } = this.props;
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
                {/* <Typography className={classes.typography}>dsf</Typography> */}
                {this.renderFriends()}
                
                {/* {this.props.frndReq.length !== 0 ? this.props.frndReq.map(friend => {
                  return (
                      <div key={friend._id}>
                         <Typography className={classes.typography}>{friend.displayName} </Typography>
                         <Typography className={classes.typography}>{friend.email} </Typography>
                         <Button className={classes.typography} onClick={() => this.frndReqResponse(friend, 1)}>Accept</Button>
                         <Button className={classes.typography} onClick={() => this.frndReqResponse(friend, 0)}>Decline</Button>
                      </div>
                  );
                }) : <Typography className={classes.typography}>No requests </Typography>}
                 */}
                
                
                
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