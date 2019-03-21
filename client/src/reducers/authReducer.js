import * as action from '../actions/actionTypes';

export default function(state = null, actions) {
    // console.log(action);
    switch(actions.type) {
        case action.FETCH_USER:
            return actions.payload || false;              //Boolean trick. a '' is treated as false coz !!'' is true
        default: 
            return state;
    }
};



