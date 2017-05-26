import React from 'react';

class PasswordList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            savedPasswords: [],
        }
    }

    render() {
        if(this.props.savedPasswords) {
            console.log(this.props.savedPasswords.length);
            console.log(this.state.savedPasswords.length);
            if(this.props.savedPasswords.length > 0) {
                return (
                    <tbody>
                        { this.props.savedPasswords.map((password, index) => {
                            {/*console.log(password)*/}
                            return (
                                <tr key={index}>
                                    <td>{password.url}</td>
                                    <td>{password.username}</td>
                                    <td>{password.password}</td>
                                    <td>{password.createdAt}</td>
                                    <td>{password.updatedAt}</td>
                                </tr>
                            );
                        }) }
                    </tbody>
                );
            } else {
                return(
                    <div>
                        <h3>No password entry is found</h3>
                    </div>
                );
            }

        } else {
            return(
                <div>
                    <h3>Loading data ...</h3>
                </div>
            );
        }
    }

    componentDidUpdate() {
        if(this.props.savedPasswords) {
            if(this.props.savedPasswords !== this.state.savedPasswords) {
                console.log(this.props.savedPasswords);
                this.setState({
                    savedPasswords: this.props.savedPasswords
                });
                console.log(this.state.savedPasswords);
            }
        }
    }

}

export default PasswordList;