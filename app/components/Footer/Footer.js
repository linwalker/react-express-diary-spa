/**
 * Created by linyuhua on 2017/2/9.
 */
import React,{Component} from 'react';
import style from './Footer.css'
class Footer extends Component {
    render() {
        return(
            <div className={style.footer}>
                <p>© 2017 linyuhua</p>
                <p>Just for fun</p>
                <p>Powered by <a href="http://expressjs.com/" target="_blank">Express</a> and
                    <a href="https://facebook.github.io/react/" target="_blank"> React</a></p>
            </div>
        )
    }
}

export default Footer;