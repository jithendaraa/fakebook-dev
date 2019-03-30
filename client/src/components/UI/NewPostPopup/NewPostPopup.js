import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import MyButton from '../Button/Button';
import TextArea from '../TextArea/TextArea';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class NewPostPopup extends React.Component {
  state = {
    open: false,
  };

  async componentDidMount() {
    await this.props.fetchUser();
    await this.props.getMyFriends(this.props.auth.myFriends);
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  async submitPost() {
    const post = document.getElementById("newPostInput").value;
    await axios.post('/api/posts', {post});
    window.location.href = "/";
    console.log("posted");
}

  render() {
    return (
      <div>
        <MyButton onClick={this.handleClickOpen} btnText="+ New Post" />
  
        
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            New Post
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            <TextArea
                                placeholder="Type Something here"
                                type="text"
                                id="newPostInput"
                                name="postt"
                                width="400px"
                                height="200px" />
                            
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button 
                type="submit" 
                btnText="Post" 
                onClick={this.submitPost}>
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    auth: state.auth,
    myFriends: state.myFriends 
  }
}

export default connect(mapStateToProps, actions)(NewPostPopup);