import React, { Component } from 'react';
import classes from './Users.css';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
// import MyFriends from '../../UI/MyFriends/MyFriends';
import Spinner from '../../UI/Spinner/Spinner';
import socketIoClient from 'socket.io-client';
import MyBtn from '../../UI/Button/Button';
import Chatbox from '../Chat/Chatbox';
import PictionaryBtn from '../../UI/PictionaryReqPopup/PictionaryReqPopup';
import PictionaryReqPopup from '../../UI/PictionaryReqPopup/PictionaryReqPopup';

class Users extends Component {

    state = {
        socket: socketIoClient('http://localhost:5000'),
        chats: null,
        onlineUsers: [],
        openChatId: null,
        openChatName: null
    }

    parentDivChild = textObj => {
        let displayTexts = document.getElementById("displayTexts");
        let parentDiv = document.createElement("div");


        let p = document.createElement("p");
        p.innerHTML = textObj.fromName.split(" ")[0] + ": " + textObj.message;
        p.style.display = "inline-block";
        p.style.padding = "2px 5px";
        p.style.borderRadius = "10px";
        p.style.backgroundColor = "black";
        p.style.color = "goldenrod";
        p.style.wordBreak = "break-all";
        p.style.maxWidth = "200px";
        if (textObj.fromId === this.props.auth._id) {
            p.style.backgroundColor = "goldenrod";
            p.style.color = "black";
            parentDiv.align = "right";
            p.style.textAlign = "left";
        }
        parentDiv.appendChild(p);
        displayTexts.appendChild(parentDiv);
        displayTexts.scrollTop = displayTexts.scrollHeight;
    }



    componentDidMount() {
        this.state.socket.on('connect', () => {
            console.log("connected to sockets " + this.state.socket.id);

            let connectedUserObj = {
                displayName: this.props.auth.displayName,
                userId: this.props.auth._id,
                socketId: this.state.socket.id
            }
            this.state.socket.emit('online users', connectedUserObj)
        });

        this.state.socket.on('online users', async onlineUsers => {
            await this.setState({ onlineUsers: onlineUsers });
            console.log(onlineUsers)
        });

        this.state.socket.on('message', async textObj => {
            if (textObj.fromId !== this.props.auth._id) {
                await this.setState({
                    openChatId: textObj.fromId,
                    openChatName: textObj.fromName
                });

            }
            else if (textObj.fromId === this.props.auth._id) {
                await this.setState({
                    openChatId: textObj.toId,
                    openChatName: textObj.toName
                })
            }
        });

        this.state.socket.on('playReq', res => {
            // console.log(res);
            let users = document.getElementById('users');
            

        });
    }


    userChatClicked = async (user) => {
        await this.setState({ openChatId: user._id, openChatName: user.displayName });
        console.log(this.state.openChatName);
        if (document.getElementById("chatDiv") !== null) {
            document.getElementById("chatDiv").style.display = "block";
        }

    }

    

    displayMyFriends = () => {

        let i, onlineId;
        let onlineIds = [];
        for (i = 0; i < this.state.onlineUsers.length; i++) {
            onlineId = this.state.onlineUsers[i].userId;
            onlineIds.push(onlineId);
        }

        return (
            <div>
                {this.props.myFriends.map(friend => {
                    let onlineBool = 0;
                    if (onlineIds.includes(friend._id)) {
                        onlineBool = 1;
                    }

                    return (
                        <div key={friend._id} style={{ display: "flex", flexWrap: "wrap", cursor: "pointer" }} >
                            <div style={{ display: "flex", flexWrap: "wrap", cursor: "pointer" }}>
                                {onlineBool === 1 ? (<div style={{ paddingTop: "10px", paddingRight: "3px" }}><div className={classes.Onlinedot}> </div></div>) : (<div style={{ paddingTop: "6px", paddingRight: "3px" }}><div className={classes.Offlinedot}> </div></div>)}
                                <div style={{paddingTop: "4px"}} onClick={() => this.userChatClicked(friend)}>{friend.displayName}</div>
                                {onlineBool === 1 ? 
                                    // (<MyBtn btnText="Pictionary" height="30px" fontSize="12px" paddingBottom="10px" onClick={() => {this.PictionaryReq(friend)}}/>) : 
                                    <PictionaryReqPopup socket={this.state.socket} friend={friend}/> :
                                    null}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div id="users" style={{ display: "flex", flexWrap: "wrap" }}>

                <Chatbox openChatId={this.state.openChatId} openChatName={this.state.openChatName} socket={this.state.socket} />
                
                <div className={classes.UsersWrapDiv}>
                    <b>Online Users</b>
                    {this.props.myFriends != null ? <div>{this.displayMyFriends()}</div> : (<Spinner />)}
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        myFriends: state.myFriends
    }
}

export default connect(mapStateToProps, actions)(Users);    