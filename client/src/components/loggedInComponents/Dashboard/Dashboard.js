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
import Chatbox from '../Chat/Chatbox';
import Users from '../Users/Users'


class Dashboard extends Component {

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
        let dt = document.getElementById("displayTexts");
        dt.scrollTop = dt.scrollHeight;

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
                <div className={classes.Header}>
                    <div>
                        <FrndReqNotifPopper />
                    </div>
                    <div style={{ paddingLeft: "10px" }}>
                        <MyFriends/>
                    </div>
                </div>
                <div  style={{ paddingLeft: "30px" }}>
                    <ProfilePic />
                    <h4>Dashboard</h4>
                    {/* {this.checkDashboard()} */}
                    
                        
        
                    
                    {/* <div id="chatDiv" className={classes.ChatDiv}>
                        <div id="displayTexts" className={classes.DisplayTexts}>
                            <div className={classes.Username}>Username</div>
                        </div>

                        <div id="sendText" className={classes.SendText}>
                            <input id="textInp" type="text" placeholder="Type your text here" />
                            <MyBtn btnText="send" id="sendTxtBtn" onClick={this.sendTextClicked} />
                        </div>
                    </div> */}

                </div>
                {this.props.myFriends ? (<div>{this.props.myFriends.length}</div>) : (<div>Fetching</div>)}
                <div id="chats" className={classes.Chats}>
                    
                    <Chatbox/>
                    <Users state={this.state}/>
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