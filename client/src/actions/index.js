import axios from 'axios';
import * as actions from './actionTypes';


export const fetchUser = () => async dispatch => {

    const user = await axios.get('/api/current_user');
    dispatch({ type: actions.FETCH_USER, payload: user.data });
};

export const fetchMyPosts = () => async dispatch => {

    const res = await axios.get('/api/myposts');
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
    dispatch({ type: actions.POST_LIKE_CLICKED, payload: getPost.data });
}

export const dbpostLikeClicked = (postId, userId) => async dispatch => {

    const req = {
        postId: postId,
        userId: userId,
        upvote: 1
    };
    const postReq = await axios.post('/api/postreact', req);                               //post react refers to liking, disliking or commenting on a post
    const getPost = await axios.get('/api/dashboardPosts');
    dispatch({ type: actions.DB_POST_LIKE_CLICKED, payload: getPost.data });
}

export const postDislikeClicked = (postId, userId) => async dispatch => {

    const req = {
        postId: postId,
        userId: userId,
        upvote: -1
    };
    const postReq = await axios.post('/api/postreact', req);                               //post react refers to liking, disliking or commenting on a post
    const getPost = await axios.get('/api/myposts');
    dispatch({ type: actions.POST_DISLIKE_CLICKED, payload: getPost.data });
}



export const fetchUsers = (startName) => async dispatch => {

    const getUsers = await axios.get('/api/users',
        {
            params: { startName: startName }
        });
    dispatch({ type: actions.FETCH_USERS, payload: getUsers.data });
}

export const sendFrndReq = (startName, currentUser, searchResult) => async dispatch => {

    const postFrndReq = await axios.post('/api/friendReq', {
        from: currentUser._id,
        to: searchResult
    });
    const getFrndReq = await axios.get('/api/users',
        {
            params: { startName: startName }
        });
    dispatch({ type: actions.SEND_FRND_REQ, payload: getFrndReq.data })
}

export const getFrndReq = (currentUser) => async dispatch => {

    const getReq = await axios.get('/api/frndReq', { params: { currentUser: currentUser } });
    dispatch({ type: actions.FETCH_FRND_REQ, payload: getReq.data });
}

export const frndAccept = (currentUser, friend) => async dispatch => {

    const postAddFrnd = await axios.post('/api/addFrnd', {
        currentUser: currentUser,
        friend: friend
    });
    const getReq = await axios.get('/api/frndReq', { params: { currentUser: currentUser } });
    dispatch({ type: actions.FRND_ACCEPT, payload: getReq.data });
}

export const frndDecline = (currentUser, friend) => async dispatch => {

    const postDeclineFrnd = await axios.post('/api/declineFrnd', {
        currentUser: currentUser,
        friend: friend
    });
    const getReq = await axios.get('/api/frndReq', { params: { currentUser: currentUser } });
    dispatch({ type: actions.FRND_DECLINE, payload: getReq.data });
}

export const fetchDashboardPosts = (currentUser) => async dispatch => {

    const getDashboardPosts = await axios.get('/api/dashboardPosts', { params: { currentUser: currentUser } });
    dispatch({ type: actions.FETCH_DASHBOARD_POSTS, payload: getDashboardPosts.data });
}

export const getMyFriends = (friendIds) => async dispatch => {
    
    const myFriends = await axios.get('/api/myFriends', { params: {
        friendIds: friendIds
    }});
    dispatch({ type: actions.GET_MY_FRIENDS, payload: myFriends.data })
}





