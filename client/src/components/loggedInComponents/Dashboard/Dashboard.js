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

class Dashboard extends Component {

    frndReqNotif = () => {
        axios.get('/api/frndReqNotifs', {
            params: {
                currentUser: this.props.auth._id
            }
        })
    }

    userId = () => (this.props.auth._id)

    likeClicked(id) {
        const userId = this.userId();
        console.log("like Clicked by " + userId);

        this.props.postLikeClicked(id, userId);
    }

    dislikeClicked(id) {
        console.log("dislike Clicked");
        const userId = this.userId();
        // this.props.postDislikeClicked(id, userId);
    }

    getPosts = async () => {
        const getDashboardPosts = await this.props.fetchDashboardPosts(this.props.auth._id);
        console.log(this.props.dashboardPosts);
    }

    fetchUserFromId = async (id) => {
        const fetch = await axios.get('/api/getUserFromId', { params: { id: id } });
        console.log(id);
    }

    async componentDidMount() {
        this.getPosts();
    }

    renderPosts() {
        if (this.props.dashboardPosts == undefined) {
            return (<div style={{ paddingLeft: "30px" }}><Spinner /></div>)
        }
        else if (this.props.dashboardPosts == null || this.props.dashboardPosts == [] || this.props.dashboardPosts._doc == undefined) {
            console.log(this.props.dashboardPosts);
            return (<div style={{ paddingLeft: "30px" }}>No posts to display</div>)
        }
        else if (this.props.dashboardPosts.length >= 1) {
            return this.props.dashboardPosts.map(dashboardPost => {
                return (
                    <div key={dashboardPost._doc._id} style={{ paddingTop: "10px", paddingLeft: "30px" }}>
                        <SimpleCard
                            postedOn={new Date(dashboardPost._doc.postedOn).toLocaleDateString()}
                            postedBy={dashboardPost.displayName}
                            postedByEmail={dashboardPost.email}
                            postBody={dashboardPost._doc.post}
                            likes={dashboardPost._doc.likes.length}
                            dislikes={dashboardPost._doc.dislikes.length}
                            comments={dashboardPost._doc.comments.length}
                            likeOnClick={() => this.likeClicked(dashboardPost._doc._id)}
                            dislikeOnClick={() => this.dislikeClicked(dashboardPost._doc._id)}
                        />
                    </div>
                )
            })
        }
    }

    renderChat(){
        console.log("RENDER TIME")
    }

    render() {
        return (
            <div>
                <div style={{ paddingLeft: "30px" }} className={classes.Header}>
                    <div>
                        <FrndReqNotifPopper />
                    </div>
                    <div style={{paddingLeft: "10px"}}>
                        <MyFriends />
                    </div>
                    
                </div>
                <div style={{paddingLeft: "30px"}}>
                    <ProfilePic />
                    <h4>Dashboard</h4>
                </div>
                
                {this.renderPosts()}

                {this.renderChat()}
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