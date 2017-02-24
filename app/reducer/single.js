/**
 * Created by linyuhua on 2017/2/16.
 */
import {
    SINGLE_FAILURE,
    SINGLE_REQUEST,
    SINGLE_SUCCESS
} from '../constants/actionTypes';

const initialState = {
    article:{},
    isFetched:false,
    isFetching:false
}
export const single = (state = initialState,action) => {
    switch (action.type) {
        case SINGLE_REQUEST:
            return Object.assign({},state,{
                isFetched:false,
                isFetching:true
            })
        case SINGLE_SUCCESS:
            return Object.assign({},state,{
                isFetched:true,
                isFetching:false,
                article:action.article
            })
        case SINGLE_FAILURE:
            return Object.assign({},state,{
                isFetched:false,
                isFetching:false
            })
        default:
            return Object.assign({},state,{})
    }
}

export default single;