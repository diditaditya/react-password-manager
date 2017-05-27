import React from 'react';

import style from '../style/style';

class PasswordList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            savedPasswords: [],
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

    render() {
        if(this.props.savedPasswords) {
            // console.log(this.props.savedPasswords.length);
            // console.log(this.state.savedPasswords.length);
            if(this.props.savedPasswords.length > 0) {
                // console.log(this.props.savedPasswords);
                return (
                    <div>
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
                                    if (urlTest) {
                                        return <tr key={index}>
                                            <td> {password.url} </td>
                                            <td> {password.username} </td>
                                            <td> {password.password} </td>
                                            <td> {this.convertDate(password.createdAt)} </td>
                                            <td> {this.convertDate(password.updatedAt)} </td>
                                            <td> <i className="material-icons" style={style.clickable}>create</i> </td>
                                            <td> <i className="material-icons" style={style.clickable}>clear</i> </td>
                                        </tr>
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            } else {
                return (
                    <div>
                        <h3>No password entry is found</h3>
                    </div>
                );
            }

        } else {
            return (
                 <div>
                    <div class="mdl-spinner mdl-js-spinner is-active"></div>
                    <h3>Loading data ..</h3>
                </div>
            );
        }
    }

    // componentDidUpdate() {
    //     if(this.props.savedPasswords) {
    //         if(this.props.savedPasswords.length === 0) {
    //             console.log(this.props.savedPasswords);
    //             this.setState({
    //                 savedPasswords: this.props.savedPasswords
    //             });
    //             console.log(this.state.savedPasswords);
    //         }
    //     }
    // }

}

export default PasswordList;