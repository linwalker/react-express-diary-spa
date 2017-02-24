/**
 * Created by linyuhua on 2017/2/15.
 */
import React,{Component} from 'react';
import {Link} from 'react-router';
import style from './Single.css';

class Single extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article:{},
            firstTime:true
        }
    }

    componentDidMount() {
        this.props.actions.getSingle(this.props.params.day,this.props.params.title)
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.firstTime && nextProps.single.isFetched) {
            this.setState({
                article:nextProps.single.article,
                firstTime:false
            })
        }
    }

    onDeleteHandler() {
        if(window.confirm('Are you sure to delete this article?')){
            this.props.actions.deleteArticle(this.props.params.day,this.props.params.title)
        }
    }

    render() {
        const {
            title,
            time,
            content,
            tags
        } = this.state.article;
        const allowed = (this.props.check.isAuthenticated || this.props.auth.isAuthenticated)

        return (
            <div className={style.single}>
                {this.state.article.content ?
                    <div>
                        <h1>{title}</h1>
                        <time>{time.day}</time>
                        <div className={style.content}>{content}</div>
                        {allowed ?
                            <button ><Link to={`/edit/${time.day}/${title}`}>Edit</Link></button >
                            :''
                        }
                        {allowed ?
                            <button><Link to='/page/1' onClick={this.onDeleteHandler.bind(this)}>Delete</Link></button>
                            :''
                        }
                    </div>
                    :<div>error</div>
                }
            </div>
        )
    }
}

export default Single;