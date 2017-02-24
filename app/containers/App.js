/**
 * Created by linyuhua on 2017/2/9.
 */
import React,{Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import * as actions from '../actions/index.js';

import Header from '../components/Header/Header.js';
import Body from '../components/Body/Body.js';
import Footer from '../components/Footer/Footer.js';

class App extends Component {
    render() {
        return(
            <div>
                <Header auth={this.props.auth}
                        check={this.props.check}
                        login={this.props.actions.loginUser}
                        checkAuthenticatedMatched={this.props.actions.checkAuthenticatedMatched}
                        logoutAndRedirect={this.props.actions.logoutAndRedirect}
                        checkAuth={this.props.actions.checkAuth}
                        location={this.props.location.pathname}
                />
                <Body children = {this.props.children} {...this.props} />
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth:{
            token:state.auth.token,
            isAuthenticated:state.auth.isAuthenticated,
            isAuthenticating:state.auth.isAuthenticating,
            status:state.auth.status,
            statusText:state.auth.statusText
        },
        check: {
            isAuthenticating: state.check.isAuthenticating,
            isAuthenticated: state.check.isAuthenticated
        },
        getTitles: {
            isFetched: state.getTitles.isFetched,
            isFetching: state.getTitles.isFetching,
            articles: state.getTitles.articles,
            fetchFailure: state.getTitles.fetchFailure,
            count: state.getTitles.count,
            err: state.getTitles.err
        },
        remove: {
            isRemoving: state.remove.isRemoving,
            isRemoved: state.remove.isRemoved
        },
        single: {
            isFetching: state.single.isFetching,
            isFetched: state.single.isFetched,
            article: state.single.article
        },
        edit: {
            isPosting: state.edit.isPosting,
            isPosted: state.edit.isPosted
        }
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        actions:bindActionCreators(actions,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)