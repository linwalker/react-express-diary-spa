/**
 * Created by linyuhua on 2017/2/9.
 */
import React, {Component} from 'react';
import style from './Body.css';
import SideBar from '../SideBar/SideBar.js'
class Body extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className={style.main}>
                <div className={style.content}>
                    {React.cloneElement(this.props.children, this.props)}
                </div>
                <SideBar
                    titlesFetched={this.props.getTitles.isFetched || this.props.single.isFetched || (this.props.location.pathname==="/write")}
                    history={this.props.history}
                    getTitles={this.props.actions.getTitles}
                />
            </div>
        )
    }
}

export default Body;