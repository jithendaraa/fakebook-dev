import axios from 'axios';
import * as actions from './actionTypes';
// import { start } from 'repl';

export const fetchUser = () => async dispatch => {
    const user = await axios.get('/api/current_user');
    dispatch({ type: actions.FETCH_USER, payload: user.data });
};

export const fetchMyPosts = () => async dispatch => {
    const res = await axios.get('/api/myposts');
    // console.log("sadas: " + res.data);
    dispatch({ type: actions.FETCH_MYPOSTS, payload: res.data });                             //res.data has our data as an array containing my post details
};

export const postLikeClicked = (postId, userId) => async dispatch => {
    const req = {
        postId: postId,
        userId: userId,
        upvote: 1
    };

    const postReq = await axios.post('/api/postreact', req);                               //post react refers to liking, disliking or commenting on a post
    const getPost = await axios.get('/api/myposts');
    console.log(postReq);

    dispatch({ type: actions.POST_LIKE_CLICKED, payload: getPost.data });
}

export const postDislikeClicked = (postId, userId) => async dispatch => {
    const req = {
        postId: postId,
        userId: userId,
        upvote: -1
    };

    const postReq = await axios.post('/api/postreact', req);                               //post react refers to liking, disliking or commenting on a post
    const getPost = await axios.get('/api/myposts');
    console.log(postReq);

    dispatch({ type: actions.POST_DISLIKE_CLICKED, payload: getPost.data });
}

export const fetchUsers = (startName) => async dispatch => {
    console.log(startName);
    const getUsers = await axios.get('/api/users', {startName});   

    dispatch({ type: actions.FETCH_USERS, payload: getUsers.data });
}


