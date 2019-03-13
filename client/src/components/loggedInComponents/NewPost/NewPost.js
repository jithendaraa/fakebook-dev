import React, { Component } from 'react';
import Header from '../Header';

import classes from './NewPost.css';
import TextArea from '../../UI/TextArea/TextArea';
import Button from '../../UI/Button/Button';
import * as actions from '../../../actions';
import axios from 'axios';

import { connect } from 'react-redux';

class NewPost extends Component {

    

    async submitPost() {
        const post = document.getElementById("newPostInput").value;
        const httpPostReq = await axios.post('/api/posts', {post});
        // window.location.href('/');
        window.location.href = "/";
    }

    render() {
        return (
            <div>
                <center>
                    <div className={classes.NewPostWrapper}>
                        <center><h3>New Post</h3></center>
                        {/* <form 
                            action='/api/posts' 
                            method="post"
                            > */}
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
                        {/* </form> */}
                    </div>
                </center>
            </div>
        )
    }
} 
    
export default connect(null, actions)(NewPost);