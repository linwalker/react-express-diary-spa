/**
 * Created by linyuhua on 2017/2/17.
 */
import React,{Component} from 'react';
import {Link} from 'react-router';

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles:[]
        }
    }

    componentDidMount() {
        this.props.actions.getTitles({
            type: "SEARCH",
            searchString: this.props.params.word
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            articles: nextProps.getTitles.articles
        })
    }

    renderTitle() {
        if(this.state.articles.length === 0) return <li>Could not found anything...</li>
        return this.state.articles.map((a, i) =>
            <li key={i}>
                <Link to={`/article/${a.time.day}/${a.title}`}>{a.title}</Link>
                <time>{a.time.day}</time>
            </li>
        )
    }

    render(){
        return (
            <div>
                <h2>SEARCH: {this.props.params.word}</h2>
                <ul>
                    {this.renderTitle()}
                </ul>
            </div>
        )
    }
}

export default SearchResult;