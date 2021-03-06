/**
 * Created by linyuhua on 2017/2/9.
 */
import React,{Component} from 'react';
import {Link} from 'react-router'
import style from './Article.css';
class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles:[]
        }
    }

    componentDidMount() {
        this.props.actions.getTitles({
            type:'ARTICLE'
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            articles: nextProps.getTitles.articles
        })
    }
    renderMonth() {
        let articles = []
        let group = []
        let index = 0
        // toArray
        if (this.state.articles.length !== 0) {
            let lastMonth = this.state.articles[0].time.month
            this.state.articles.forEach(function(article, i) {
                if(lastMonth == article.time.month) {
                    group.push(article)
                } else {
                    articles[index] = group
                    lastMonth = article.time.month
                    group = []
                    group.push(article)
                    index++
                }
                if(i === articles.length) {
                    articles[index] = group
                }
            })
            return articles.map((as, i) =>
                <div key={i}>
                    <h3>{as[0].time.month}</h3>
                    <ul>
                        {as.map((a, j) =>
                            <li key={j}><Link to={`/article/${a.time.day}/${a.title}`}>{`${j+1}. ${a.title}`}</Link></li>
                        )}
                    </ul>
                </div>
            )
        }

        return "NO ARCHIVE"
    }

    render() {
        return(
            <div className={style.article}>
                {this.renderMonth()}
            </div>
        )
    }
}

export default Article;