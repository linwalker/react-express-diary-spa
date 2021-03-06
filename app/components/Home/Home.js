/**
 * Created by linyuhua on 2017/2/9.
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import style from './Home.css'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: parseInt(this.props.params.pageId, 10) || 1,
            length: (this.props.getTitles.count / 10 + 1) || 1,
            articles: []
        }
    }

    componentDidMount() {
        this.props.actions.getTitles({
            type:"HOME",
            page:this.state.page
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            length:nextProps.getTitles.count/10 + 1,
            articles:nextProps.getTitles.articles
        })
    }

    onPreClick() {
        if(this.state.page >=2) {
            this.props.actions.getTitles({
                type:"HOME",
                page:this.state.page - 1
            })
            this.setState({
                page:this.state.page - 1
            })
        }
    }

    onNextClick() {
        if(this.state.page <= this.state.length - 1) {
            this.props.actions.getTitles({
                type:"HOME",
                page:this.state.page + 1
            });
            this.setState({
                page:this.state.page + 1
            })
        }
    }
    onRenderSingle() {
        if (this.state.articles === []) return '';
        if (this.state.articles[0] === undefined) return '';
        return this.state.articles.map((a, i) =>
            <div key={i} className={style.single}>
                <h2><Link to={`/article/${a.time.day}/${a.title}`}>{a.title}</Link></h2>
                <time>{a.time.day}</time>
                <p className={style.content}>{a.content}</p>
            </div>
        )

    }

    render() {
        let pre = (this.state.length >= 2) ?
            this.state.page - 1 : this.state.page;
        let next = (this.state.page <= this.state.length - 1) ?
            this.state.page + 1 : this.state.page;
        return (
            <div className={style.home}>
                {this.onRenderSingle()}
                <div>
                    <button><Link to={`/page/${pre}`}
                                  onClick={this.onPreClick.bind(this)}>Pre</Link></button>
                    <button><Link to={`/page/${next}`}
                                  onClick={this.onNextClick.bind(this)}>Next</Link></button>
                </div>
            </div>
        )
    }
}

export default Home;