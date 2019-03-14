import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../actions';

import SimpleCard from '../../../components/UI/Card/SimpleCard';
import Header from '../Header';
// import Flip from 'react-reveal/Flip';
import LightSpeed from 'react-reveal/LightSpeed';



class MyPosts extends Component {

    userId = () => (this.props.auth._id)

    displayName = () => (this.props.auth.displayName)

    email = () => (this.props.auth.email)

    posts = () => {console.log(this.props.posts)}

    likeClicked(id) {
        console.log("like Clicked");
        const userId = this.userId();
        this.props.postLikeClicked(id, userId);
        this.posts();
    }

    dislikeClicked(id){
        console.log("dislike Clicked");
        const userId = this.userId();
        this.props.postDislikeClicked(id, userId);
        this.posts();
    }

    componentDidMount() {
        this.props.fetchMyPosts();
        
    }

    renderMyPosts = () => {
        switch (this.props.posts) {
            case null:
                return (<div><b>...Loading</b></div>)
            default:

                if (this.props.posts.length >= 1) {
                    return this.props.posts.reverse().map(post => {
                        return (
                            <div key={post._id}>
                            <LightSpeed>
                                <SimpleCard
                                    postedBy={this.displayName()}
                                    postedByEmail={this.email()}
                                    postBody={post.post}
                                    likes={post.likes.length}
                                    dislikes={post.dislikes.length}
                                    comments={post.comments.length}
                                    postedOn={new Date(post.postedOn).toLocaleDateString()}
                                    likeOnClick={() => this.likeClicked(post._id)}
                                    dislikeOnClick={() => this.dislikeClicked(post._id)}
                                /><br />
                            </LightSpeed>
                               
                            </div>
                        )
                    });
                }
                else if (this.props.posts.length === 0){
                    return (<div>No posts to show</div>);
                }

        }
    }

    render() {
        return (
            <div>
                <Header />

                <h3 style={{ paddingLeft: "30px" }}>MyPosts</h3>
                <div style={{ paddingLeft: "30px" }}>
                    {this.renderMyPosts()}
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        posts: state.posts
    };
};

export default connect(mapStateToProps, actions)(MyPosts);





