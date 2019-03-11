import React from 'react';
import Header from '../Header';

import classes from './NewPost.css';
import TextArea from '../../UI/TextArea/TextArea';
import Button from '../../UI/Button/Button';

const newPost = () => (
        <div>
            <Header />
            <center>
            <div className={classes.NewPostWrapper}>
                <center><h3>New Post</h3></center>
                <form >
                    <TextArea 
                        placeholder="Type Something here"
                        type="text"
                        id="newPostInput"
                        name="post"
                        width="400px"
                        height="200px"/>
                    <Button type="submit" btnText="Post"/>
                </form>
            </div>
            </center>
        </div>
);

export default newPost;