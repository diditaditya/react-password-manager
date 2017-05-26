import React from 'react';
import { connect } from 'react-redux';

import { savePassword } from '../store/passwordAction';

class PasswordForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            username: '',
            password: ''
        }
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

    handleSubmit(event) {
        console.log('in handle submit');
        let data = {
            url: this.state.url,
            username: this.state.username,
            password: this.state.password,
            createdAt: new Date(),
            updatedAt: ''
        }
        this.props.savePassword(data);
        this.setState({
            url: '',
            username: '',
            password: ''
        });
    }

    render() {
        return (
            <div>
                <label>URL</label>
                <input value={this.state.url} onChange={(e) => this.urlOnChange(e)} type="text"/>
                <label>Username</label>
                <input value={this.state.username} onChange={(e) => this.usernameOnChange(e)} type="text"/>
                <label>Password</label>
                <input value={this.state.password} onChange={(e) => this.passwordOnChange(e)} type="password"/>
                <button onClick={()=>this.handleSubmit()} >Save</button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        savePassword: (data) => dispatch(savePassword(data))
    });
}

export default connect(null, mapDispatchToProps)(PasswordForm);