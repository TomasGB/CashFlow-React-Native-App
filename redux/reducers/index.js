import { combineReducers } from "redux";
import {
    LOGIN,
    SIGNUP,
    UPDATE_NAME,
    UPDATE_EMAIL,
    UPDATE_PASSWORD,
} from "../actions/user";

// reducers

const user = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return action.value;
        case SIGNUP:
            return action.value;
        case UPDATE_NAME:
            return { ...state, name: action.value };
        case UPDATE_EMAIL:
            return { ...state, email: action.value };
        case UPDATE_PASSWORD:
            return { ...state, password: action.value };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    user,
});

export default rootReducer;
