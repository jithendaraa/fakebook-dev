import * as action from '../actions/actionTypes';

export default function (state = null, actions) {
    switch(actions.type) {
        case action.SET_SOCKET:
            return actions.payload;                  
        default:
            return state;
    }
}