import React from 'react';
import { connect } from 'react-redux';

import style from '../style/style';
import { deletePassword, updatePassword } from '../store/passwordAction';

class PasswordItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            url: '',
            username: '',
            password: ''
        };
    }

    convertDate(oriDate) {
        if(oriDate.length > 0) {
            let fullDate = new Date(oriDate);
            let year = fullDate.getFullYear();
            let month = String(fullDate.getMonth() + 1);
            if(month.length === 1) {
                month = '0' + month;
            }
            let date = String(fullDate.getDate());
            if(date.length === 1) {
                date = '0' + date;
            }
            return `${year}-${month}-${date}`;
        }
    }

    openEditForm() {
        this.setState({
            editMode: true
        });
    }

    closeEditForm() {
        this.setState({
            editMode:false
        });
    }

    onUrlChange(e) {
        this.setState({
            url: e.target.value
        })
    }

    onUsernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    updatePassword() {
        let now = new Date();
        let data = {
            id: this.props.password.id,
            url: this.state.url,
            username: this.state.username,
            password: this.state.password,
            createdAt: this.props.password.createdAt,
            updatedAt: now.toISOString()
        };
        this.props.updatePassword(this.props.index, data);
        this.setState({
            editMode: false
        });
    }

    deletePassword(index, id) {
        if(window.confirm('Do you want to delete this password?')) {
            this.props.deletePassword({index, id});
        }
    }

    render() {
        if(this.state.url.length > 0 || this.state.username.length > 0 || this.state.password.length > 0) {
            if(this.state.editMode) {
                return (
                    <tr>
                        <td> <input className={style.input} type="text" value={this.state.url} onChange={(e)=>this.onUrlChange(e)} style={style.edit}/> </td>
                        <td> <input className={style.input} type="text" value={this.state.username} onChange={(e)=>this.onUsernameChange(e)} style={style.edit}/> </td>
                        <td> <input className={style.input} type="text" value={this.state.password} onChange={(e)=>this.onPasswordChange(e)} style={style.edit}/> </td>
                        <td> {this.convertDate(this.props.password.createdAt)} </td>
                        <td> {this.convertDate(this.props.password.updatedAt)} </td>
                        <td> <i onClick={this.updatePassword.bind(this)} className="material-icons" style={style.clickable}>done</i> </td>
                        <td> <i onClick={this.closeEditForm.bind(this)} className="material-icons" style={style.clickable}>clear</i> </td>
                    </tr>
                );
            } else {
                return (
                    <tr>
                        <td> {this.props.password.url} </td>
                        <td> {this.props.password.username} </td>
                        <td> {this.props.password.password} </td>
                        <td> {this.convertDate(this.props.password.createdAt)} </td>
                        <td> {this.convertDate(this.props.password.updatedAt)} </td>
                        <td> <i onClick={this.openEditForm.bind(this)}  className="material-icons" style={style.clickable}>create</i> </td>
                        <td> <i onClick={this.deletePassword.bind(this, this.props.index, this.props.password.id)} className="material-icons" style={style.clickable}>clear</i> </td>
                    </tr>
                );
            }    
        } else {
            return (
                <tr>
                    <td></td>
                    <td><div id="p2" className="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div></td>

                </tr>
            );
        }
        
        
    }

    componentDidMount() {
        if(this.props.password) {
            this.setState({
                url: this.props.password.url,
                username: this.props.password.username,
                password: this.props.password.password
            });
        }
    }

}

const mapDispatchToProps = (dispatch) => {
    return ({
        deletePassword: (data) => dispatch(deletePassword(data)),
        updatePassword: (index, data) => dispatch(updatePassword(index, data))
    });
}

export default connect(null, mapDispatchToProps)(PasswordItem);