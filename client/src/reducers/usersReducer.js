import * as action from '../actions/actionTypes';

export default function(state = null, actions){
    switch(actions.type){
        case action.FETCH_USERS:
            return actions.payload;
        
        default:
            return state;
    }
}