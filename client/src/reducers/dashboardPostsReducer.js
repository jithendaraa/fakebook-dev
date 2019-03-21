import * as action from '../actions/actionTypes';

export default function (state = null, actions) {
    // console.log(action);
    switch (actions.type) {
        case action.FETCH_DASHBOARD_POSTS:
            return actions.payload;
        case action.DB_POST_LIKE_CLICKED:
            return actions.payload;
        // case action.DBPOST_DISLIKE_CLICKED:
        //     return actions.payload;
        default:
            return state;
    }
};