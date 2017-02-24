/**
 * Created by linyuhua on 2017/2/9.
 */
import React,{Component}from 'react'
import style from './Sidebar.css';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:''
        }
    }

    onChangeHandler(e) {
        this.setState({
            text:e.target.value
        })
    }

    onSearch(e) {
        var text = this.state.text;
        if(e.which == 13 && text!='') {
            this.props.getTitles({
                type:"SEARCH",
                searchString:text
            })
            window.location = 'http://localhost:5000/searchResult/' + text;
        }
    }
    render() {
        return(
            <div className={style.sidebar}>
                <span>Search Article:</span>
                <ul></ul>
                <input
                    placeholder="search"
                    ref="search"
                    type="text"
                    onChange={this.onChangeHandler.bind(this)}
                    onKeyDown={this.onSearch.bind(this)}
                    key
                />
                <iframe  src="//music.163.com/outchain/player?type=2&id=139774&auto=0&height=66"></iframe>
            </div>
        )
    }
}

export default SideBar;