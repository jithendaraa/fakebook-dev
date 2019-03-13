import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import * as actions from '../../../actions';
import { fetchMyPosts } from '../../../actions';
// import 'materialize-css/dist/css/materialize.min.css';
import SimpleCard from '../../../components/UI/Card/SimpleCard';
class MyPosts extends Component {



    componentDidMount() {
        this.props.fetchMyPosts();
        console.log(2);
    }

    renderMyPosts = () => {
        switch (this.props.posts.length) {
            case 0:
                return (<div><b>No posts to show</b></div>)
            default:
                return this.props.posts.reverse().map(post => {
                    return (
                        <div key={post._id}>
                            <SimpleCard  
                                postedBy={this.props.auth.displayName}
                                postedByEmail={this.props.auth.email}
                                postBody={post.post}
                                likes={post.likes.length}
                                dislikes={post.dislikes.length}
                                comments={post.comments.length}
                                postedOn={new Date(post.postedOn).toLocaleDateString()}
                            /><br />
                            {/* <p>Posted on: {}</p> */}
                        </div>
                    )
                });
        }
    }

    render() {
        return (
            <div>
                <h3 style={{paddingLeft: "30px"}}>MyPosts</h3>
                <div style={{paddingLeft: "30px"}}>
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

export default connect(mapStateToProps, { fetchMyPosts })(MyPosts);