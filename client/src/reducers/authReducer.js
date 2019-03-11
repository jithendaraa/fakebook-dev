import { FETCH_USER } from '../actions/actionTypes';


export default function(state = null, action) {
    // console.log(action);
    switch(action.type) {
        case FETCH_USER:
            return action.payload || false;              //Boolean trick. a '' is treated as false coz !!'' is true
        default: 
            return state;
    }
};



