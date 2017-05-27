import React from 'react';
import { connect } from 'react-redux';

import { savePassword } from '../store/passwordAction';
import style from '../style/style';

class PasswordForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            username: '',
            password: '',
            message: ''
        };
    }

    urlOnChange(event) {
        this.setState({
            url: event.target.value
        });
    }

    usernameOnChange(event) {
        this.setState({
            username: event.target.value
        });
    }

    passwordOnChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    getNewId() {
        let maxId = 0;
        this.props.savedPasswords.map((password) => {
            if(password.id > maxId) {
                maxId = password.id;
            }
        });
        return maxId + 1;
    }

    handleSubmit(event) {
        if(this.state.url.length > 0 && this.state.username.length > 0 && this.state.password.length > 0) {
            let now = new Date();
            let data = {
                id: this.getNewId(),
                url: this.state.url,
                username: this.state.username,
                password: this.state.password,
                createdAt: now.toISOString(),
                updatedAt: ''
            }
            this.props.savePassword(data);
            this.setState({
                url: '',
                username: '',
                password: '',
                message: ''
            });
        } else {
            this.setState({
                message: "url, username, and password are required"
            });
        }
        
    }

    convertDateToSave(oriDate) {
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
            let hour = String(fullDate.getHours());
            if(hour.length === 1) {
                hour = '0' + hour;
            }
            let minute = String(fullDate.getMinutes());
            if(minute.length === 1) {
                minute = '0' + minute;
            }
            let second = String(fullDate.getSeconds());
            if(second.length === 1) {
                second = '0' + second;
            }
            return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
        }
    }

    render() {
        if(this.props.savedPasswords) {
            return (
                <div>
                    <fieldset style={style.bordered}>
                        <legend><h5>Save New Password</h5></legend>
                        <div>
                            <div className={style.textField}>
                                <input className={style.input} value={this.state.url} onChange={(e) => this.urlOnChange(e)} type="text" id="url"/>
                                <label className={style.label} htmlFor="url">URL</label>
                            </div>
                            <br/>
                            <div className={style.textField}>
                                <input className={style.input} value={this.state.username} onChange={(e) => this.usernameOnChange(e)} type="text" id="username" />
                                <label className={style.label} htmlFor="username" >Username</label>
                            </div>
                            <br/>
                            <div className={style.textField}>
                                <input className={style.input} value={this.state.password} onChange={(e) => this.passwordOnChange(e)} type="password" id="password" />
                                <label className={style.label} htmlFor="password" >Password</label>    
                            </div>
                            <br/>
                        </div>
                        <br/>
                        <button className={style.standardButton}  onClick={()=>this.handleSubmit()} >Save</button>
                        <p>{this.state.message}</p>
                    </fieldset>
                </div>
            );
        } else {
            return (
                <div>
                    <div class="mdl-spinner mdl-js-spinner is-active"></div>
                </div>
            );
            
        }
        
    }
}

const mapStateToProps = (state) => {
    return ({
        savedPasswords: state.savedPasswords
    });
}

const mapDispatchToProps = (dispatch) => {
    return ({
        savePassword: (data) => dispatch(savePassword(data))
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordForm);