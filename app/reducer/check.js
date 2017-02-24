/**
 * Created by linyuhua on 2017/2/11.
 */
import {
    CHECK_AUTHENTICATED_REQUEST,
    CHECK_AUTHENTICATED_MATCHED
} from '../constants/actionTypes.js';

const initialState = {
    isAuthenticated:false,
    isAuthenticating:false
}

const check = (state=initialState,action) => {
    switch(action.type) {
        case CHECK_AUTHENTICATED_REQUEST:
            return Object.assign({},state,{
                isAuthenticating:true
            });
        case CHECK_AUTHENTICATED_MATCHED:
            return Object.assign({},state,{
                isAuthenticated:action.isAuthenticated
            });
        default:
            return Object.assign({},state,{});
    }
}

export default check;