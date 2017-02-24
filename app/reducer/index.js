/**
 * Created by linyuhua on 2017/2/11.
 */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import auth from './auth';
import check from './check';
import getTitles from './getTitles';
import remove from './remove';
import single from './single';
import edit from './edit';

export default combineReducers({
    auth,
    check,
    getTitles,
    remove,
    single,
    edit,
    routing: routerReducer
})
