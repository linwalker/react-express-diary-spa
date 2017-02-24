/**
 * Created by linyuhua on 2017/2/9.
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import style from './Header.css'
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: this.props.auth.isAuthenticated,
            text:'',
            show:{
                display:'none'
            },
            isShown:false,
            shouldBeLogout: false
        }
    }

    componentDidMount() {
        if(!!localStorage.token) {
            this.props.checkAuth()
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isAuthenticated: nextProps.check.isAuthenticated
        })

        if(nextProps.auth.isAuthenticated) {
            this.setState({
                isAuthenticated:true
            })
        }
    }
    onChangeHandler(e) {
        this.setState({
            text:e.target.value
        })
    }

    onKeyDownHandler(e) {
        if(e.which ===13 && this.state.text!='') {
            const password = this.state.text;
            this.props.login(password)
            this.setState({
                text:'',
                show:{
                    display:'none'
                },
                isShown:false
            })
        }
    }

    onLoginHandler(e) {
        e.preventDefault();
        if(this.state.isShown) {
            this.setState({
                show:{
                    display:'none'
                },
                isShown:false
            })
        } else {
            this.setState({
                isShown:true,
                show:{
                    display:'flex'
                }
            })
        }

    }

    onLogoutHandler() {
        this.setState({
            isAuthenticated:false,
            shouldBeLogout: true
        })
        this.props.checkAuthenticatedMatched(false);
        this.props.logoutAndRedirect()
    }

    render() {
        return (
            <div className={style.heading}>
                <div className={style.header}>
                    <h1><Link to="/">My diary</Link></h1>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/article">article</Link></li>
                        {
                            this.state.isAuthenticated ?
                                <li><Link to="/write">write</Link></li> :
                                <li>no access</li>
                        }
                        {
                            this.state.isAuthenticated ?
                                <li onClick={this.onLogoutHandler.bind(this)}>logout</li> :
                                <li onClick={this.onLoginHandler.bind(this)}>login</li>
                        }
                    </ul>
                </div>
                <div className={style.login} style={this.state.show}>
                    <label htmlFor="">Please input password</label>
                    <input ref="pass"
                           value={this.state.text}
                           placeholder={'Enter'}
                           onChange={this.onChangeHandler.bind(this)}
                           onKeyDown={this.onKeyDownHandler.bind(this)}
                    />
                </div>
            </div>

        )
    }
}

export default Header;