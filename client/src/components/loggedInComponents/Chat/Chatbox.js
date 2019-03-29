import React, { Component } from 'react';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import socketIoClient from 'socket.io-client';
import MyBtn from '../../UI/Button/Button';
import classes from '../Users/Users.css'

class Chatbox extends Component {

    constructor(props){
        super(props);

        this.chats = []
    }
   

    componentDidMount() {
        this.props.fetchUser();

        this.props.socket.on("connect", () => {
            console.log("socket connected to chatbox " + this.props.socket.id);
           
            

            this.props.socket.on("output", chats => {
                console.log("private chats received");
                console.log(chats);

                let displayTexts = document.getElementById("displayTexts");
                document.getElementById("displayTexts").innerHTML = "";
                if (chats.length > 0) {
                    chats.map(text => {
                        let parentDiv = document.createElement("div");
                        let p = document.createElement("p");
                        p.innerHTML = text.fromName.split(" ")[0] + ": " + text.message;
                        p.style.display = "inline-block";
                        p.style.padding = "2px 5px";
                        p.style.borderRadius = "10px";
                        p.style.backgroundColor = "black";
                        p.style.color = "goldenrod";
                        p.style.wordBreak = "break-all";
                        p.style.maxWidth = "200px";
                        if (text.fromId == this.props.auth._id) {
                            p.style.backgroundColor = "goldenrod";
                            p.style.color = "black";
                            parentDiv.align = "right";
                            p.style.textAlign = "left";
                        }
                        parentDiv.appendChild(p);
                        displayTexts.appendChild(parentDiv);
                    });
                }

            });

        });

        // this.props.socket.on('output', data => {
        //     console.log(data)
        // })
        // console.log(typeof(this.props.auth._id))
        
    }

    userNameClick = () => {
        console.log("closed")
        document.getElementById("chatDiv").style.display = "none";
    }

    getChatWindow = () => {
        if (this.props.openChat != null) {

            // console.log(this.props.openChat)
            let chatBetween = [];
            chatBetween.push(this.props.auth._id);
            chatBetween.push(this.props.openChat._id);
            // console.log(chatBetween)
            // this.props.socket.on("connect", () => {
                
                this.props.socket.emit('output', chatBetween);
                console.log("output emitted")
            // })
            
            // console.log(chats)
            // let i;
            
            // for(i=0; i<this.state.chats.length; i++){
            //     if((this.state.chats[i].fromId == this.props.auth._id) || (this.state.chats[i].toId == this.props.auth._id)){
            //         // chats.push(this.state.chats[i])
            //     }
            // }

            return (
                <div id="chatDiv" className={classes.ChatDiv}>
                    <div className={classes.Username} onClick={this.userNameClick}>{this.props.openChat.displayName}</div> 
                    <div id="displayTexts" className={classes.DisplayTexts}>
                        
                    </div>

                    <div id="sendText" className={classes.SendText}>
                        <input id="textInp" type="text" placeholder="Type your text here" style={{ width: "228px" }} />
                        <MyBtn btnText="send" id="sendTxtBtn" onClick={this.sendTextClicked} />
                    </div>
                </div>
            )
        }
    }

    sendTextClicked = () => {
        let textInp = document.getElementById("textInp");
        let message = textInp.value;
        console.log(textInp.value);
        document.getElementById("textInp").value = "";
    }

    render() {
        return (
            <div style={{ display: "flex", flexWrap: "flex" }}>

                    {this.getChatWindow()}

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