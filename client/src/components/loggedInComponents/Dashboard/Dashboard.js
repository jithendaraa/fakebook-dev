import React, { Component } from 'react';
import ProfilePic from '../ProfilePic/ProfilePic';
import FrndReqNotifPopper from '../../UI/FrndReqNotifPopper/FrndReqNotifPopper';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import axios from 'axios';
import SimpleCard from '../../UI/Card/SimpleCard';
import MyFriends from '../../UI/MyFriends/MyFriends';
import classes from './Dashboard.css';
import Spinner from '../../UI/Spinner/Spinner';
import socketIoClient from 'socket.io-client';
import { Button } from '@material-ui/core';
import MyBtn from '../../UI/Button/Button';



class Dashboard extends Component {

    state = {
        socketId: null,
        socket: socketIoClient('http://localhost:5000'),
        chats: null
    }

    userId = () => (this.props.auth._id)

    likeClicked = async (id) => {
        const userId = this.userId();
        await this.props.dbpostLikeClicked(id, userId);
    }

    dislikeClicked = async (id) => {
        const userId = this.userId();
        await this.props.dbpostDislikeClicked(id, userId);
    }

    getPosts = async () => {
        await this.props.fetchDashboardPosts(this.props.auth._id);
    }

    fetchUserFromId = async (id) => {
        const fetch = await axios.get('/api/getUserFromId', { params: { id: id } });
        console.log(id, fetch);
    }

    async componentDidMount() {

        this.state.socket.on("connect", () => {

            this.setState({ socketId: this.state.socket.id });

            let displayTexts = document.getElementById("displayTexts");

            this.state.socket.on('output', async chats => {
                let texts = [];
                chats.map(chat => {
                    if (chat.fromId == this.props.auth._id || chat.toId == this.props.auth._id) {
                        texts.push(chat);
                    }
                });
                await this.setState({ chats: texts });

                if (texts.length > 0) {
                    texts.map(text => {
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

            this.state.socket.on('message', textObj => {
                console.log("received")
            //     let parentDiv = document.createElement("div");
            //     let p = document.createElement("p");
            //     p.innerHTML = textObj.fromName.split(" ")[0] + ": " + textObj.message;
            //     p.style.display = "inline-block";
            //     p.style.padding = "2px 5px";
            //     p.style.borderRadius = "10px";
            //     p.style.backgroundColor = "black";
            //     p.style.color = "goldenrod";
            //     p.style.wordBreak = "break-all";
            //     p.style.maxWidth = "200px";
            //     if (textObj.fromId == this.props.auth._id) {
            //         p.style.backgroundColor = "goldenrod";
            //         p.style.color = "black";
            //         parentDiv.align = "right";
            //         p.style.textAlign = "left";
            //     }
            //     parentDiv.appendChild(p);
            //     displayTexts.appendChild(parentDiv);
            })

            console.log("connected to sockets");
        });

        await this.getPosts();
    }



    commmentsOnClick = (id) => {
        console.log("Comment of post " + id + " clicked")
    }

    renderPosts = () => {
        return (
            <div>
                {this.state.socketId == null ? (<div>sad</div>) : (<div>{this.state.socketId}</div>)}
                {
                    this.props.dashboardPosts.reverse().map(dashboardPost => {

                        return (
                            <div key={dashboardPost.post._id} style={{ paddingTop: "10px", paddingLeft: "30px" }}>
                                <SimpleCard
                                    postedOn={new Date(dashboardPost.post.postedOn).toLocaleDateString()}
                                    postTime={new Date(dashboardPost.post.postedOn).toLocaleTimeString()}
                                    postedBy={dashboardPost.user.displayName}
                                    postedByEmail={dashboardPost.user.email}
                                    postBody={dashboardPost.post.post}
                                    likes={dashboardPost.post.likes.length}
                                    dislikes={dashboardPost.post.dislikes.length}
                                    comments={dashboardPost.post.comments.length}
                                    likeOnClick={() => this.likeClicked(dashboardPost.post._id)}
                                    dislikeOnClick={() => this.dislikeClicked(dashboardPost.post._id)}
                                    commentsOnClick={() => this.commentsClicked(dashboardPost.post._id)}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    checkDashboard() {
        if (this.props.dashboardPosts) {
            if (this.props.dashboardPosts.length === 0) {
                return (<div>No posts to display</div>)
            }
            else if (this.props.dashboardPosts.length >= 1) {
                return this.renderPosts();
            }
        }
        else {
            return (<Spinner />)
        }
    }

    sendTextClicked = () => {
        let message = document.getElementById("textInp").value;
        let from = this.props.auth._id;
        document.getElementById("textInp").value = "";
        console.log(message);

        let textObj = {
            fromId: this.props.auth._id,
            fromName: this.props.auth.displayName,
            toId: this.props.myFriends[0]._id,
            toName: this.props.myFriends[0].displayName,
            message: message
        };

        this.state.socket.emit('message', textObj);

        console.log("sent")


    }



    render() {
        return (
            <div>
                <div style={{ paddingLeft: "30px" }} className={classes.Header}>
                    <div>
                        <FrndReqNotifPopper />
                    </div>
                    <div style={{ paddingLeft: "10px" }}>
                        <MyFriends />
                    </div>
                </div>
                <div style={{ paddingLeft: "30px" }}>
                    <ProfilePic />
                    <h4>Dashboard</h4>
                    {/* {this.checkDashboard()} */}



                    <div id="chatDiv" style={{ backgroundColor: "gray", height: "1000px" }}>

                        <div id="displayTexts" style={{ backgroundColor: "white", width: "300px", height: "400px", border: "1px solid black", overflowY: "scroll", overflowX: "hidden" }}>
                            <div style={{ width: "300px", border: "1px solid black" }}>Username</div>
                        </div>

                        <div id="sendText" style={{ display: "flex", flexWrap: "wrap" }}>

                            <input id="textInp" type="text" placeholder="Type your text here" />
                            <MyBtn btnText="send" id="sendTxtBtn" onClick={this.sendTextClicked} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        frndReq: state.frndReq,
        dashboardPosts: state.dashboardPosts,
        myFriends: state.myFriends
    }
}

export default connect(mapStateToProps, actions)(Dashboard);