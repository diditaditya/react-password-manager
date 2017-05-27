import React from 'react';
import { connect } from 'react-redux';

import style from '../style/style';
import { deletePassword } from '../store/passwordAction';
import PasswordItem from './PasswordItem';

class PasswordList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            savedPasswords: null,
        }
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

    // deletePassword(index, id) {
    //     console.log(index);
    //     console.log(id);
    //     console.log(this.props);
    //     this.props.deletePassword({index: index, id: id});
    // }

    render() {
        if(this.props.savedPasswords) {
            if(this.props.savedPasswords.length > 0) {
                return (
                    <div>
                        {/*<p>this.props.savedPasswords.length: {this.props.savedPasswords.length}</p>*/}
                        <table className={style.table} style={style.center}>
                            <thead>
                                <tr>
                                    <th>URL</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Created at</th>
                                    <th>Updated at</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.savedPasswords.map((password, index) => {
                                    let pattern = new RegExp(this.props.searchString+'.*');
                                    let urlTest = pattern.test(password.url.toLowerCase());
                                    let usernameTest = pattern.test(password.username.toLowerCase());
                                    let passwordTest = pattern.test(password.password.toLowerCase());
                                    if (urlTest || usernameTest || passwordTest) {
                                        return <PasswordItem key={index} password={password} index={index} />
                                        {/*return <tr key={index}>
                                            <td> {password.url} </td>
                                            <td> {password.username} </td>
                                            <td> {password.password} </td>
                                            <td> {this.convertDate(password.createdAt)} </td>
                                            <td> {this.convertDate(password.updatedAt)} </td>
                                            <td> <i className="material-icons" style={style.clickable}>create</i> </td>
                                            <td> <i onClick={this.deletePassword.bind(this, index, password.id)} className="material-icons" style={style.clickable}>clear</i> </td>
                                        </tr>*/}
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            } else {
                return (
                    <div>
                        <h5>No saved passwords</h5>
                    </div>
                );
            }

        } else {
            return (
                 <div>
                    <div class="mdl-spinner mdl-js-spinner is-active"></div>
                    <h5>Loading data ..</h5>
                </div>
            );
        }
    }

    componentDidUpdate() {
        if(this.props.savedPasswords) {
            if(this.state.savedPasswords) {
                let passwordArr = this.props.savedPasswords;
                passwordArr.map((password) => {
                    password.editFormStatus = false
                });
                this.setState({
                    savedPasswords: passwordArr
                });
            }
        }
    }

}

const mapDispatchToProps = (dispatch) => {
    return ({
        deletePasswordFromList: (data) => dispatch(deletePassword(data))
    });
}

export default connect(null, mapDispatchToProps)(PasswordList);