/**
 * Created by linyuhua on 2017/2/9.
 */
import React, {Component} from 'react';
import style from './InputArea.css';
import md from 'marked';
class InputArea extends Component {
    constructor(props) {
        super(props)
        this.displayName = 'InputArea'
        this.state = {
            title: this.props.type === "EDIT" ? this.props.oldArticle.title : "",
            description: this.props.type === "EDIT" ? this.props.oldArticle.description : "",
            content: this.props.type === "EDIT" ? this.props.oldArticle.content : "",
            day: this.props.day,
            type: this.props.type, // new build or edit
            popup: false // popup when true
        }
    }

    componentDidMount() {
        if(this.props.allowed) {
            this.refs.title.value = this.state.title;
            this.refs.description.value = this.state.description;
            this.refs.content.value = this.state.content;
        }
    }
    onContentChange(e) {
        this.setState({ content: e.target.value })
    }

    onFinishHandler() {
        const newArticle = {
            title: this.refs.title.value.trim(),
            description: this.refs.description.value.trim(),
            content: this.refs.content.value.trim(),
        }
        if(newArticle.title !== "" &&
            newArticle.description !== "" &&
            newArticle.content !== "" ) {
            // not empty
            if(this.state.type === "WRITE") {
                this.props.upload(this.state.type, newArticle)
                alert("SUCCESS!")
                window.location = "http://localhost:5000/page/1";
                //this.props.history.pushState(null, '/')未解决问题，history为undefined，暂未找到原因
            } else if (this.state.type === "EDIT") {
                this.props.editArticle(this.props.params.day, this.props.params.title, newArticle)
                alert("SUCCESS!")
                window.location = "http://localhost:5000/page/1";
                //this.props.history.pushState(null, '/')
            }
        } else {
            // empty
            alert("FAIL TO POST! POSSIBLY THERE IS A BLANK!")
        }
    }

    onShowInput() {
        // const tags = this.state.currentTags
        let day = this.state.day;
        if(this.props.allowed) {
            return (
                <div className={style.inputArea}>
                    <p>
                        <label>title</label>
                        <input ref="title" />
                    </p>
                    <span>{day}</span>
                    <p>
                        <label>description</label>
                        <input ref="description" />
                    </p>
                    <div>
                        <label>content</label>
                        <textarea ref="content"
                                  onChange={this.onContentChange.bind(this)}></textarea>
                    </div>
                    <button onClick={this.onFinishHandler.bind(this)}>Finish</button>
                </div>
            )
        } else {
            return <h2>You are not allowed to write!<br />Login first.</h2>
        }
    }

    render() {
        return (
            <div>
                {this.onShowInput()}
            </div>
        )
    }
}

export default InputArea;