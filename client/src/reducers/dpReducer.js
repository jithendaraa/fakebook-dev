import * as action from '../actions/actionTypes';

export default function (state = '/images/empty.png', actions) {
    
    switch (actions.type) {
        case action.GET_DP:
            return actions.payload;
        default:
            return state;
    }
};