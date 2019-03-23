import React, { Component } from 'react';

// import NewPost from '../NewPost/NewPost';
// import MyPosts from '../Posts/MyPosts';
import ProfilePic from '../ProfilePic/ProfilePic';
import FrndReqNotifPopper from '../../UI/FrndReqNotifPopper/FrndReqNotifPopper';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import axios from 'axios';
import SimpleCard from '../../UI/Card/SimpleCard';
import MyFriends from '../../UI/MyFriends/MyFriends';
import classes from './Dashboard.css';
import Spinner from '../../UI/Spinner/Spinner';


// import io from 'socket.io-client';
// let id;

// const socketUrl = io('http://localhost:5000');

// const socket = io(socketUrl);

// socket.on('connect', () => {
//     console.log("Connected");
// });

class Dashboard extends Component {

    userId = () => (this.props.auth._id)

    likeClicked = async(id) => {
        const userId = this.userId();
        await this.props.dbpostLikeClicked(id, userId);
    }

    dislikeClicked = async(id) => {
        const userId = this.userId();
        await this.props.dbpostDislikeClicked(id, userId);
    }

    getPosts = async () => {
        console.log(this.props.auth._id);
        await this.props.fetchDashboardPosts(this.props.auth._id);
        console.log(this.props.dashboardPosts);
    }

    fetchUserFromId = async (id) => {
        const fetch = await axios.get('/api/getUserFromId', { params: { id: id } });
        console.log(id, fetch);
    }

    async componentDidMount() {
        await this.getPosts();
    }

    renderPosts = () => {
        return (
            <div>
                {
                    this.props.dashboardPosts.reverse().map(dashboardPost => {
                        console.log(dashboardPost)
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
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    checkDashboard(){
       if(this.props.dashboardPosts){
           if(this.props.dashboardPosts.length === 0){
               return (<div>No posts to display</div>)
           }
           else if(this.props.dashboardPosts.length >= 1){
               return this.renderPosts();
           }
       }
       else{
           return (<Spinner />)
       }
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
                    
                    {/* <div> */}
                        {this.checkDashboard()}
                    {/* </div> */}
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