import React from 'react';
import { connect } from 'react-redux';

import PasswordList from './PasswordList';
import { fetchPasswords } from '../store/passwordAction';

class SearchPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            savedPasswords: [],
            searchString: ''
        }
    }

    searchStringChange(e) {
        this.setState({
            searchString: e.target.value
        });
    }

    render() {
        // console.log(this.state.savedPasswords);
        console.log(this.props);
        if(this.props.savedPasswords) {
            return (
                    <div>
                        <p>{this.state.savedPasswords.length}</p>
                        <input type="text" value={this.state.searchString} onChange={(e)=> this.searchStringChange(e)}/>
                        <button>Search</button>
                        <table>
                            <thead>
                                <tr>
                                    <th>URL</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Created at</th>
                                    <th>Updated at</th>
                                </tr>
                            </thead>
                            <PasswordList savedPasswords={this.state.savedPasswords}/>
                        </table>
                    </div>
                );
        } else {
            return (
                    <div>
                        <h3>Loading ..</h3>
                    </div>
                );
        }

        
        
    }

    componentDidMount() {
        this.props.fetchPasswords();
    }

    componentDidUpdate() {
        if(this.props.savedPasswords) {
            if(this.state.savedPasswords.length !== this.props.savedPasswords.length) {
                this.setState({
                    savedPasswords: this.props.savedPasswords
                });
            }
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
        fetchPasswords: () => dispatch(fetchPasswords())
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPassword);