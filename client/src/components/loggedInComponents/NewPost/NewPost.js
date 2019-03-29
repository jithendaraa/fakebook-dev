import React, { Component } from 'react';

import classes from './NewPost.css';
import TextArea from '../../UI/TextArea/TextArea';
import Button from '../../UI/Button/Button';
import * as actions from '../../../actions';
import axios from 'axios';
import Users from '../Users/Users';

import { connect } from 'react-redux';

class NewPost extends Component {

    async componentDidMount() {
        await this.props.fetchUser();
        await this.props.getMyFriends(this.props.auth.myFriends);

        console.log(this.props.auth.displayName)
    }

    async submitPost() {
        
        const post = document.getElementById("newPostInput").value;
        const httpPostReq = await axios.post('/api/posts', {post});
        console.log(httpPostReq);
        window.location.href = "/";
    }

    render() {
        return (
            <div>
                <center>
                    <div className={classes.NewPostWrapper}>
                        <center><h3>New Post</h3></center>     
                            <TextArea
                                placeholder="Type Something here"
                                type="text"
                                id="newPostInput"
                                name="postt"
                                width="400px"
                                height="200px" />
                            <Button 
                                type="submit" 
                                btnText="Post" 
                                onClick={this.submitPost} 
                                />
                    </div>
                </center>
                {this.props.auth !== null ? (<div id="chats" className={classes.Chats}>
                    <Users />
                </div>) : null}
                
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
    
export default connect(mapStateToProps, actions)(NewPost);