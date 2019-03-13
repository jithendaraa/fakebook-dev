import { FETCH_MYPOSTS } from '../actions/actionTypes';

export default function (state = [], actions) {
    switch(actions.type) {
        case FETCH_MYPOSTS:
            return actions.payload;
        default:
            return state;
    }
}