import * as action from '../actions/actionTypes'

export default function(state = [], actions){
    switch(actions.type){
        case action.GET_MY_FRIENDS:
            return actions.payload;
        default:
            return state;
    }
}