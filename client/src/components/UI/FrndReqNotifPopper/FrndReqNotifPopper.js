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
    padding: theme.spacing(2),
  },
});

class SimplePopper extends React.Component {
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
    await this.props.getFrndReq(this.props.auth._id)
  }

  

  frndReqResponse = async (friend, response) => {
    console.log(response);
    if(response === 1)
    {
      await this.props.frndAccept(this.props.auth._id, friend);
      
    }
    else if(response === 0){
      await this.props.frndDecline(this.props.auth._id, friend);
    }
  }

  

  render() {
    const { classes } = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? 'simple-popper' : null;

    return (
      <div>
        <Button aria-describedby={id} variant="contained" onClick={this.handleClick}>
          Friend Requests({this.props.frndReq.length})
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                
                {this.props.frndReq.length !== 0 ? this.props.frndReq.map(friend => {
                  return (
                      <div key={friend._id}>
                         <Typography className={classes.typography}>{friend.displayName} </Typography>
                         <Typography className={classes.typography}>{friend.email} </Typography>
                         <Button className={classes.typography} onClick={() => this.frndReqResponse(friend, 1)}>Accept</Button>
                         <Button className={classes.typography} onClick={() => this.frndReqResponse(friend, 0)}>Decline</Button>
                      </div>
                  );
                }) : <Typography className={classes.typography}>No requests </Typography>}
                
                
                
                
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    );
  }
}

SimplePopper.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    frndReq: state.frndReq
  }
}

export default withStyles(styles)(connect(mapStateToProps, actions)(SimplePopper));