import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import MyButton from '../Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../../actions';


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class PictionaryReqPopup extends React.Component {
    state = {
        open: false,
        inviter: null
    };

    constructor(props) {
        super(props);

        this.sent = 0;

        this.reqBy = {
            userName: null,
            userId: null,
            socketId: null
        }

        this.x = null;                                                                          //timeout var
    }

    async componentDidMount() {
        await this.props.fetchUser();
        console.log("Yo wtf " + this.props.friend.displayName);

        this.props.socket.on('playReq', async res => {
            await this.setState({ open: true, inviter: res.fromUserName });
            this.reqBy = {
                userName: res.fromUserName,
                userId: res.fromUserId,
                socketId: res.fromSocketId
            };
            console.log("gotcha bb")
            let countdownDiv = document.getElementById('countdown');
            let i = 4;
            let countdown = setInterval(() => {
                countdownDiv.innerHTML = i;
                i -= 1;
                if (i === 0) {
                    clearInterval(countdown);
                }
            }, 1000);
        });

        this.props.socket.on('cancelReq', async () => {
            await this.setState({ open: false });
            this.sent = 0;
            
            document.getElementById('reqbtn').innerHTML = "Pictionary";
        });

        this.props.socket.on('acceptReq', res => {
            this.sent = -1;
            if(this.x !== null){
                clearInterval(this.x);
            }
        })

        
    }

    pictionaryReq = (friend) => {
        if (this.sent === 0) {
            console.log(1)
            let data = {
                fromUserId: this.props.auth._id,
                fromUserName: this.props.auth.displayName,
                fromSocketId: this.props.socket.id,
                toUserId: friend._id
            }

            this.props.socket.emit('playReq', data);
            // console.log("yeehaw")
            this.sent = 1;
            document.getElementById('reqbtn').innerHTML = "Cancel";
            this.x = setTimeout(() => { this.pictionaryReq(friend) }, 5000);
        }
        else if (this.sent === 1) {
            console.group(0)
            let data = {
                fromUserId: this.props.auth._id,
                fromUserName: this.props.auth.displayName,
                fromSocketId: this.props.socket.id,
                toUserId: friend._id
            }
            if (this.x !== null) {
                clearTimeout(this.x);
            }
            this.sent = 0;
            document.getElementById('reqbtn').innerHTML = "Pictionary";
            this.props.socket.emit('cancelReq', data);
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = (friend) => {
        this.setState({ open: false });

        let data = {
            fromUserId: this.props.auth._id,
            fromUserName: this.props.auth.displayName,
            fromSocketId: this.props.socket.id,
            toUserId: friend._id
        }
        if (this.x !== null) {
            clearTimeout(this.x);
        }
        // this.props.socket.emit('cancelReq', data);
        // this.sent = 0;
        document.getElementById('reqbtn').innerHTML = "Pictionary";
    };

    acceptReq = () => {
        console.log("request accepted");

        let data = {
            reqFromUserName: this.reqBy.userName,
            reqFromUserId: this.reqBy.userId,
            reqFromSocketId: this.reqBy.socketId,
            reqToUserName: this.props.auth.displayName,
            reqToUserId: this.props.auth._id,
            reqToSocketId: this.props.socket.id
        };
        
        this.props.socket.emit('acceptReq', data);

    }

    render() {
        return (
            <div>
                {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          + New Story
        </Button> */}
                <MyButton id="reqbtn" onClick={() => { this.pictionaryReq(this.props.friend) }} btnText="Pictionary" />
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {this.state.inviter} invited you to a game of Pictionary
          </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Request auto cancels in <div id="countdown">5</div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { this.handleClose(this.props.friend) }} color="primary">
                            Decline
            </Button>
                        <Button onClick={this.acceptReq} color="primary">
                            Accept
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(PictionaryReqPopup);