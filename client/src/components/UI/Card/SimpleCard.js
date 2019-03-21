import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// import Flip from 'react-reveal/Flip';
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

  return (
    <Card className={classes.card}>
      <Zoom>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.postedOn}
        </Typography>
        <Typography variant="h5" component="h4">
          {props.postedBy}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.postedByEmail}
        </Typography>
        <Typography component="p">
          {props.postBody}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={props.likeOnClick} hide={props.hide}>Likes({props.likes})</Button>
        <Button size="small" onClick={props.dislikeOnClick}>Dislikes({props.dislikes})</Button>
        <Button size="small">Comments({props.comments})</Button>
      </CardActions>
      </Zoom>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);