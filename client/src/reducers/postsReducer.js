import * as action from '../actions/actionTypes';

export default function (state = null, actions) {
    switch(actions.type) {
        case action.FETCH_MYPOSTS:
            return actions.payload;                  //actions.payload signifies the res.data in index.js which contains the array of post details schema

        case action.POST_LIKE_CLICKED:
            return actions.payload;

        case action.POST_DISLIKE_CLICKED:
            return actions.payload;
        
        case action.FETCH_USERS:
            return actions.payload;

        default:
            return state;
    }
}