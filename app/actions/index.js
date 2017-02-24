import fetch from 'isomorphic-fetch';
import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_REQUEST,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    CHECK_AUTHENTICATED_MATCHED,
    CHECK_AUTHENTICATED_REQUEST,
    POST_ARTICLE_REQUEST,
    POST_ARTICLE_SUCCESS,
    POST_ARTICLE_FAILURE,
    TITLES_GET_REQUEST,
    TITLES_GET_SUCCESS,
    TITLES_GET_FAILURE,
    DELETE_ARTICLE_REQUEST,
    DELETE_ARTICLE_SUCCESS,
    DELETE_ARTICLE_FAILURE,
    SINGLE_REQUEST,
    SINGLE_SUCCESS,
    SINGLE_FAILURE,
    EDIT_ARTICLE_REQUEST,
    EDIT_ARTICLE_SUCCESS,
    EDIT_ARTICLE_FAILURE,
} from '../constants/actionTypes';

export const loginUserRequest = () => {
    return {
        type: LOGIN_USER_REQUEST
    }
}

export const loginUserSuccess = (token) => {
    localStorage.setItem('token', token);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token: token
        }
    }
}

export const loginUserFailure = (error) => {
    localStorage.removeItem('token');
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            status: error.res.status,
            statusText: error.res.statusText
        }
    }
}

export const loginUser = (password) => {
    return dispatch => {
        dispatch(loginUserRequest())
        return fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password: password})
        })
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    return res
                } else {
                    var error = new Error(res.statusText)
                    error.res = res
                    throw error
                }
            })
            .then(res => res.json())
            .then(res => {
                console.log(res.success);
                if (res.success) {
                    dispatch(loginUserSuccess(res.token))
                } else {
                    dispatch(loginUserFailure({
                        res: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }))
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error))
            })
    }
}


export const checkAuthenticatedMatched = (match) => {
    return {
        type: CHECK_AUTHENTICATED_MATCHED,
        isAuthenticated: match
    }
}
export const checkAuthenticatedRequest = () => {
    return {
        type: CHECK_AUTHENTICATED_REQUEST
    }
}

export const checkAuth = () => {
    return dispatch => {
        dispatch(checkAuthenticatedRequest())
        return fetch('/api/check', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({token: localStorage.token})
        })
            .then(res => res.json())
            .then(res => {
                if (res.match) {
                    dispatch(checkAuthenticatedMatched(true))
                } else {
                    dispatch(checkAuthenticatedMatched(false))
                }
            })
    }
}
export const logout = () => {
    localStorage.removeItem('token')
    return {
        type: LOGOUT_USER
    }
}
export const logoutAndRedirect = () => {
    return (dispatch, state) => {
        dispatch(logout())
    }
}

export const postArticleRequest = () => {
    return {
        type: POST_ARTICLE_REQUEST
    }
}

export const postArticleSuccess = () => {
    return {
        type: POST_ARTICLE_SUCCESS
    }
}

export const postArticleFailure = (err) => {
    return {
        type: POST_ARTICLE_FAILURE,
        err: err
    }
}

export const postArticle = (type, article) => {
    const token = localStorage.token;
    //token = `Bearer ${token}`;
    return dispatch => {
        dispatch(postArticleRequest())
        return fetch('/api/upload', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({type: type, article: article})
        })
            .then(res => res.json())
            .then(res => {
                if (res.ok) {
                    dispatch(postArticleSuccess())
                } else {
                    dispatch(postArticleFailure(res.err))
                }
            })
    }
}

export const titlesGetRequest = () => {
    return {
        type: TITLES_GET_REQUEST
    }
}

export const titlesGetFailure = (err) => {
    return {
        type: TITLES_GET_FAILURE,
        err: err
    }
}

export const titlesGetSuccess = (articles, count) => {
    return {
        type: TITLES_GET_SUCCESS,
        articles: articles,
        count: count
    }
}

export const getTitles = ({
    type: type,
    page: page,
    searchString: searchString
}) => {
    return dispatch => {
        dispatch(titlesGetRequest())
        return fetch('/api/titles', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                type: type,
                page: page,
                searchString: searchString
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.ok) {
                    dispatch(titlesGetSuccess(res.articles, res.count))
                } else {
                    dispatch(titlesGetFailure(res.err))
                }
            })
    }
}

export const deleteArticleRequest = () => {
    return {
        type: DELETE_ARTICLE_REQUEST
    }
}

export const deleteArticleSuccess = () => {
    return {
        type: DELETE_ARTICLE_SUCCESS
    }
}

export const deleteArticleFailure = () => {
    return {
        type: DELETE_ARTICLE_FAILURE
    }
}

export const deleteArticle = (day, title) => {
    var token = localStorage.token;
    return dispatch => {
        dispatch(deleteArticleRequest());
        return fetch('/api/remove', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                day: day,
                title: title
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.ok) {
                    dispatch(deleteArticleSuccess())
                } else {
                    dispatch(deleteArticleFailure())
                }
            })
    }
}

export const getSingleRequest = () => {
    return {
        type: SINGLE_REQUEST
    }
}

export const getSingleSuccess = (article) => {
    return {
        type:SINGLE_SUCCESS,
        article:article
    }
}

export const getSingleFailure = () => {
    return {
        type:SINGLE_FAILURE
    }
}

export const getSingle = (day,title) => {
    return dispatch => {
        dispatch(getSingleRequest());
        return fetch('/api/single',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                day: day,
                title: title
            })
        })
            .then(res => res.json())
            .then(res => {
                if(res.ok) {
                    dispatch(getSingleSuccess(res.article))
                } else {
                    dispatch(getSingleFailure())
                }
            })
    }
}

export const editArticle = (oldDay,oldTitle,article) => {
    var token = localStorage.token;
    return dispatch => {
        dispatch(editArticleRequest());
        return fetch('/api/edit',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify({
                oldDay:oldDay,
                oldTitle:oldTitle,
                article:article
            })
        })
            .then(res => res.json())
            .then(res => {
                if(res.ok) {
                    dispatch(editArticleSuccess());
                } else {
                    dispatch(editArticleFailure());
                }
            })
    }
}

export const editArticleRequest = () => {
    return {
        type:EDIT_ARTICLE_REQUEST
    }
}

export const editArticleSuccess = () => {
    return {
        type:EDIT_ARTICLE_SUCCESS
    }
}

export const editArticleFailure = () => {
    return {
        type:EDIT_ARTICLE_FAILURE
    }
}