/**
 * Created by linyuhua on 2017/2/9.
 */
import React from 'react';
import {Router,Route,IndexRoute,Redirect,browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'

import App from './containers/App.js';
import Home from './components/Home/Home.js';
import Article from './components/Article/Article.js';
import Write from './components/Write/Write.js';
import Single from './components/Single/Single.js';
import Edit from './components/Edit/Edit';
import SearchResult from './components/SearchResult/SearchResult';

import configureStore from './store/configureStore.js'
import Devtools from './containers/devtools.js';
const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)


const router = (
    <Provider store={store}>
        <div>
            <Router history={history}>
                <Route path='/page/:pageId' component={App} >
                    <IndexRoute component={Home} />
                    <Route path='/article' component={Article} />
                    <Route path='/write' component={Write} />
                    <Route path="/article/:day/:title" component={Single} />
                    <Router path="/edit/:day/:title" component={Edit}/>
                    <Route path="/searchResult/:word" component={SearchResult} />
                    <Redirect from="/" to="/page/1" />
                </Route>
            </Router>
            <Devtools/>
        </div>
    </Provider>

)

export default router;