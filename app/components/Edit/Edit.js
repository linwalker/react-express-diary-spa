/**
 * Created by linyuhua on 2017/2/16.
 */
import React, {Component} from 'react';
import InputArea from '../InputArea/InputArea';
class Edit extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.single.article.time) {
            return(
                <div>
                    <InputArea
                        allowed={this.props.check.isAuthenticated || this.props.auth.isAuthenticated}
                        type="EDIT"
                        editArticle={this.props.actions.editArticle}
                        history={this.props.history}
                        oldArticle={this.props.single.article}
                        day={this.props.single.article.time.day}
                        params={this.props.params}
                    />
                </div>
            )
        } else {
            return(
                <div>error</div>
            )
        }
    }
}

export default Edit;