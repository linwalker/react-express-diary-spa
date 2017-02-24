/**
 * Created by linyuhua on 2017/2/9.
 */
import React,{Component} from 'react';
import InputArea from '../InputArea/InputArea.js';
class Write extends Component {
    constructor(props) {
        super(props)
        this.displayName = 'Write'
    }
    render() {
        const date = new Date()
        const day = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        return (
            <div>
                <InputArea allowed={this.props.auth.isAuthenticated || this.props.check.isAuthenticated}
                           type="WRITE"
                           day={day}
                           history={this.props.history}
                           upload={this.props.actions.postArticle}
                           />
            </div>
        )
    }
}

export default Write;