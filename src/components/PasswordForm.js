import React from 'react';
import { connect } from 'react-redux';

import { savePassword } from '../store/passwordAction';
import style from '../style/style';
import ValidationList from './ValidationList';

const PasswordVisibility = (props) => {
    if(props.isShown) {
        return (
            <span><i className="material-icons" style={style.showPassword} title="Don't Show Password">visibility</i> </span>
        );
    } else {
        return (
            <span><i className="material-icons" style={style.showPassword} title="Show Password">visibility_off</i> </span>
        );
    }
}

class PasswordForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            username: '',
            password: '',
            message: '',
            validation: {
                isCapitalLetter: false,
                isSmallLetter: false,
                isNumber: false,
                isSpecialChar: false,
                isLongerThan5: false
            },
            showPassword: false
        };
        this.inputType = 'password'
    }

    toggleShowPassword() {
        if(this.state.showPassword) {
            this.setState({
                showPassword: false
            });
            this.inputType = 'password';
        } else {
            this.setState({
                showPassword: true
            });
            this.inputType = 'text'
        }
    }

    isCapitalLetter(string) {
        return /[A-Z]/.test(string)
    }

    isLowercaseLetter(string) {
        return /[a-z]/.test(string)
    }

    isNumber(string) {
        return /[0-9]/.test(string)
    }

    isSpecialChar(string) {
        return /[!@#$%^&*)(\-_+=}\]{\[|\\:;"'<,>.?\/]/.test(string)
    }

    isLongerThan5(string) {
        return string.length > 5
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
        let string = event.target.value
        this.setState({
            password: string,
            validation: {
                isCapitalLetter: this.isCapitalLetter(string),
                isSmallLetter: this.isLowercaseLetter(string),
                isNumber: this.isNumber(string),
                isSpecialChar: this.isSpecialChar(string),
                isLongerThan5: this.isLongerThan5(string)
            }
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
        this.setState({
                message: ''
            });
        if(this.state.url.length > 0 && this.state.username.length > 0 && this.state.password.length > 0) {
            let containsCapitalLetter = this.state.validation.isCapitalLetter;
            let containsSmallLetter = this.state.validation.isSmallLetter;
            let containsNumber = this.state.validation.isNumber;
            let containsSpecialChar = this.state.validation.isSpecialChar;
            let isLongerThan5 = this.state.validation.isLongerThan5;
            if( containsCapitalLetter && containsSmallLetter  && containsNumber && containsSpecialChar && isLongerThan5) {
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
            }
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

    test() {
        alert('qqeqe');
    }

    render() {
        if(this.props.savedPasswords) {
            return (
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--3-col" ></div>
                    <div className="mdl-cell mdl-cell--6-col">
                        <fieldset style={style.bordered}>
                            <legend><h5>Save New Password</h5></legend>
                            <div className="mdl-grid" >
                                <div className="mdl-cell mdl-cell--6-col">
                                    <span onClick={()=> this.toggleShowPassword()}><PasswordVisibility isShown={this.state.showPassword} /></span>
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
                                            <input className={style.input} value={this.state.password} onChange={(e) => this.passwordOnChange(e)} type={this.inputType} id="password" />
                                            <label className={style.label} htmlFor="password">Password</label>
                                        </div>
                                        <br/>
                                    </div>
                                    <br/>
                                    <button className={style.standardButton}  onClick={()=>this.handleSubmit()} >Save</button>
                                    <p>{this.state.message}</p>
                                </div>
                                <div className="mdl-cell mdl-cell--6-col">

                                    <ValidationList validation={this.state.validation}/>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mdl-cell mdl-cell--3-col"></div>
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
