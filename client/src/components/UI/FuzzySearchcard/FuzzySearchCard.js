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
  userDp: {
    width: "100px",
    height: "100px",
    borderRadius: "70px",
    transition: "0.8s",
    filter: "grayscale(100%)",
    cursor: "pointer",
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

  function entered(){
    // console.log("entered");
    let imgElement = document.getElementById(props.id);
    imgElement.style.borderRadius = "0px";
    imgElement.style.filter = "grayscale(0%)";
    imgElement.style.transition = "0.8s";

  }

  function left(){
    // console.log("left")
    let imgElement = document.getElementById(props.id);
    imgElement.style.borderRadius = "70px";
    imgElement.style.filter = "grayscale(100%)";
    imgElement.style.transition = "0.8s";
  }

  return (
    <Card className={classes.card}>
      <Zoom>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            User
        </Typography>
        <div style={{display: "flex", flexWrap: "wrap"}}>
            <div style={{paddingLeft: "20px"}}>
              <img alt="dp" className={classes.userDp} onMouseEnter={entered} onMouseLeave={left} src={props.imgSrc} id={props.id} />
            </div>
            <div style={{paddingTop: "30px", paddingLeft: "30px"}}>
                <Typography variant="h5" component="h4">
                      {props.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {props.txt}
                </Typography>
                <Typography component="p">
                  {props.email}
                </Typography>
            </div>
        </div>          
        </CardContent>
        <CardActions>
          <div>{props.frndStatusBool === 1 ? <Button size="small">{props.frndStatus}</Button> : <Button id="addFrnd" size="small" onClick={clicked}>Add Friend</Button>}</div>

          
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