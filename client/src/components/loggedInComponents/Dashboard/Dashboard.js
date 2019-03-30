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
// import socketIoClient from 'socket.io-client';
// import { Button } from '@material-ui/core';
// import MyBtn from '../../UI/Button/Button';
// import Chatbox from '../Chat/Chatbox';
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
        console.log(this.props.dashboardPosts[0])
    }

    commmentsOnClick = (id) => {
        console.log("Comment of post " + id + " clicked")
    }

    renderPosts = () => {
        return (
            <div>
               
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
                return (<div style={{color: "white"}}>No posts to display</div>)
            }
            else if (this.props.dashboardPosts.length >= 1) {
                return this.renderPosts();
            }
        }
        else {
            return (<Spinner />)
        }
    }



    render() {
        return (
            <div>
                <div className={classes.Header}>
                    <div>
                        <FrndReqNotifPopper />
                        {console.log(23)}
                    </div>
                    <div style={{ paddingLeft: "10px" }}>
                        <MyFriends />
                    </div>
                </div>
                <div style={{ paddingLeft: "30px" }}>
                    <ProfilePic />
                    <h4 style={{color: "white"}}>Dashboard</h4>
                    {this.checkDashboard()}
                </div>

                <div id="chats" className={classes.Chats}>
                    <Users />
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