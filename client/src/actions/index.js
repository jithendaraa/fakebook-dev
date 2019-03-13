import axios from 'axios';
import { FETCH_USER, FETCH_MYPOSTS } from './actionTypes';

export const fetchUser = () => async dispatch => {
    const user = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: user.data });
};

export const fetchMyPosts = () => async dispatch => {
    const res = await axios.get('/api/myposts');
    dispatch({ type: FETCH_MYPOSTS, payload: res.data});                             //res.data has our data as an array containing my post details
};




