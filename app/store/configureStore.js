/**
 * Created by linyuhua on 2017/2/12.
 */
import rootReducer from '../reducer/index';
import routes from '../route'
import {reduxReactRouter} from 'redux-router'
import {applyMiddleware, compose, createStore} from 'redux'
import createHistory from 'history/lib/createBrowserHistory'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import Devtools from '../containers/devtools';
const configureStore = (initialState) => {

    const createStoreWithMiddleware = compose(
        applyMiddleware(thunk, createLogger()),
        Devtools.instrument(),
        reduxReactRouter({routes, createHistory})
    )

    if (module.hot) {
        module.hot
            .accept('../reducer/index.js', () => {
                const nextRootReducer = require('../reducer/index.js')
                store.replaceReducer(nextRootReducer)
            })
    }

    const store = createStoreWithMiddleware(createStore)(rootReducer, initialState)

    return store
}

export default configureStore