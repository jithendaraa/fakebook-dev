import React, { Component } from 'react';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import socketIoClient from 'socket.io-client';
import MyBtn from '../../UI/Button/Button';
import classes from '../Users/Users.css'

class Chatbox extends Component {



    componentDidMount() {
        this.props.fetchUser();
    }

    userNameClick = () => {
        console.log("clicked")
        document.getElementById("chatDiv").style.display = "none";
    }

    getChatWindow = () => {
        if (this.props.openChat != null) {
            return (
                <div id="chatDiv" className={classes.ChatDiv}>
                    <div id="displayTexts" className={classes.DisplayTexts}>
                        <div className={classes.Username} onClick={this.userNameClick}>{this.props.openChat.displayName}</div>
                    </div>

                    <div id="sendText" className={classes.SendText}>
                        <input id="textInp" type="text" placeholder="Type your text here" style={{ width: "228px" }} />
                        <MyBtn btnText="send" id="sendTxtBtn" onClick={this.sendTextClicked} />
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div style={{ display: "flex", flexWrap: "flex" }}>

                    {this.getChatWindow()}

                {/* <div id="chatDiv" className={classes.ChatDiv}>
                    <div id="displayTexts" className={classes.DisplayTexts}>
                        <div className={classes.Username} onClick={this.userNameClick}>Username</div>
                    </div>

                    <div id="sendText" className={classes.SendText}>
                        <input id="textInp" type="text" placeholder="Type your text here" style={{ width: "228px" }} />
                        <MyBtn btnText="send" id="sendTxtBtn" onClick={this.sendTextClicked} />
                    </div>
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(Chatbox);



//On Connection to sockets

        // this.state.socket.on("connect", () => {

        //     this.setState({ socketId: this.state.socket.id });
        //     let displayTexts = document.getElementById("displayTexts");

        //     //Online users socket events -- start
        //     this.state.socket.emit("online users", { 
        //         name: this.props.auth.displayName, 
        //         userId: this.props.auth._id, 
        //         socketId: this.state.socket.id 
        //     });

        //     this.state.socket.on('online users', onlineUsers => {
        //         console.log(onlineUsers);
        //         this.setState({ onlineUsers: onlineUsers });
        //     });
        //     //Online users socket events -- end


        //     //Socket event to get pre-existing chats from DB -- start
        //     this.state.socket.on('output', async chats => {
        //         let texts = [];
        //         chats.map(chat => {
        //             if (chat.fromId == this.props.auth._id || chat.toId == this.props.auth._id) {
        //                 texts.push(chat);
        //             }
        //         });
        //         await this.setState({ chats: texts });

        //         if (texts.length > 0) {
        //             texts.map(text => {
        //                 let parentDiv = document.createElement("div");
        //                 let p = document.createElement("p");
        //                 p.innerHTML = text.fromName.split(" ")[0] + ": " + text.message;
        //                 p.style.display = "inline-block";
        //                 p.style.padding = "2px 5px";
        //                 p.style.borderRadius = "10px";
        //                 p.style.backgroundColor = "black";
        //                 p.style.color = "goldenrod";
        //                 p.style.wordBreak = "break-all";
        //                 p.style.maxWidth = "200px";
        //                 if (text.fromId == this.props.auth._id) {
        //                     p.style.backgroundColor = "goldenrod";
        //                     p.style.color = "black";
        //                     parentDiv.align = "right";
        //                     p.style.textAlign = "left";
        //                 }
        //                 parentDiv.appendChild(p);
        //                 // console.log(displayTexts.clientHeight());
        //                 // console.log(displayTexts.height());
        //                 displayTexts.appendChild(parentDiv);
        //             });
        //         }
        //         displayTexts.scrollTop = displayTexts.scrollHeight;
        //     });
        //     //Socket event to get pre-existing chats from DB -- end


        //     //Socket event to listen for messages -- start
        //     this.state.socket.on('message', textObj => {
        //         console.log("received")
        //         let parentDiv = document.createElement("div");
        //         let p = document.createElement("p");
        //         p.innerHTML = textObj.fromName.split(" ")[0] + ": " + textObj.message;
        //         p.style.display = "inline-block";
        //         p.style.padding = "2px 5px";
        //         p.style.borderRadius = "10px";
        //         p.style.backgroundColor = "black";
        //         p.style.color = "goldenrod";
        //         p.style.wordBreak = "break-all";
        //         p.style.maxWidth = "200px";
        //         if (textObj.fromId == this.props.auth._id) {
        //             p.style.backgroundColor = "goldenrod";
        //             p.style.color = "black";
        //             parentDiv.align = "right";
        //             p.style.textAlign = "left";
        //         }
        //         parentDiv.appendChild(p);
        //         displayTexts.appendChild(parentDiv);
        //         displayTexts.scrollTop = displayTexts.scrollHeight;  
        //     });

            //Socket event to listen for messages -- end
        //     console.log("connected to sockets");
        // });

        //Connection to sockets end          