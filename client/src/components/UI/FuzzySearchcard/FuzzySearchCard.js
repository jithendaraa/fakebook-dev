import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as actions from '../../../actions';
import { connect } from 'react-redux';

import axios from 'axios';

import Zoom from 'react-reveal/Zoom';

const styles = {
  card: {
    minWidth: 200,
    width: "40%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function SimpleCard(props) {
  const { classes } = props;

  function clicked() {
    props.sendFrndReq(props.startName, props.auth, props.id)
    .then(() => {
        document.getElementById("addFrnd").innerHTML = "Request Sent";
    });
  }

  return (
    <Card className={classes.card}>
      <Zoom>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            User
        </Typography>
          <Typography variant="h5" component="h4">
            {props.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.txt}
          </Typography>
          <Typography component="p">
            {props.email}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button id={props.id}>Fraaands</Button> */}
          {props.frndStatusBool == 1 ? <Button size="small">{props.frndStatus}</Button> : <Button id="addFrnd" size="small" onClick={clicked}>Add Friend</Button>}

          {/* <Button size="small"></Button> */}

        </CardActions>
      </Zoom>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export default withStyles(styles)(connect(mapStateToProps, actions)(SimpleCard));