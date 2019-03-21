import * as action from '../actions/actionTypes'

export default function(state = [], actions){
    switch(actions.type){
        case action.FETCH_FRND_REQ:
            return actions.payload;
        case action.SEND_FRND_REQ:
            return actions.payload;
        case action.FRND_ACCEPT:
            return actions.payload;
        case action.FRND_DECLINE:
            return actions.payload;
        default:
            return state;
    }
}