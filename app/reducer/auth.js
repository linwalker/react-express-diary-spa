/**
 * Created by linyuhua on 2017/2/10.
 */
import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_REQUEST,
    LOGIN_USER_FAILURE,
    LOGOUT_USER
} from '../constants/actionTypes';

const initialState = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    status: null,
    statusText: null
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return Object.assign({}, state, {
                'isAuthenticating': true,
                'statusText': null
            })

        case LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                'isAuthenticating': false,
                'isAuthenticated': true,
                'token': action.payload.token,
                'statusText': 'You have been successfully logged in.'
            })

        case LOGIN_USER_FAILURE:
            return Object.assign({}, state, {
                'isAuthenticated': false,
                'isAuthenticating': false,
                'token': null,
                'userName': null,
                'statusText': `Authentication Error: ${action.payload.status} ${action.payload.status}`
            })

        case LOGOUT_USER:
            return Object.assign({}, state, {
                'isAuthenticated': false,
                'isAuthenticating': false,
                'token': null,
                'statusText': 'You have been successfully logged out.'
            })

        default:
            return Object.assign({}, state, {})
    }
}

export default auth;