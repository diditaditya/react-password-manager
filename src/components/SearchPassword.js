import React from 'react';
import { connect } from 'react-redux';

import PasswordList from './PasswordList';
import { fetchPasswords } from '../store/passwordAction';
import style from '../style/style';

class SearchPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            savedPasswords: [],
            searchString: '',
            searchMessage: ''
        }
    }

    searchStringChange(e) {
        let string = e.target.value;
        if(/[-?.\]\(\)\[+]/.test(string)) {
            this.setState({
                searchMessage: 'May not start with special characters such as ?, +, [, ], (, ), $, and so on'
            });
        } else {
            this.setState({
                searchString: string,
                searchMessage: ''
            });
        }

    }

    search() {
        if(this.state.searchString.length > 0) {
            console.log(this.state.searchString);
        }
    }

    render() {
        // console.log(this.state.savedPasswords);
        // console.log(this.props.savedPasswords);
        if(this.props.savedPasswords) {
            return (
                    <div style={style.bordered}>
                        {/*<p>saved passwords in local state: {this.state.savedPasswords.length}</p>
                        <p>saved passwords in props: {this.props.savedPasswords.length}</p>*/}
                        <div className={style.textField} >
                            <input className={style.input} type="text" value={this.state.searchString} onChange={(e)=> this.searchStringChange(e)} id="searchString" />
                            <label className={style.label} htmlFor="searchString">Filter Keyword</label>
                        </div>
                        <span>    </span>
                        {/*<button className={style.standardButton} onClick={() => this.search()} >Search</button>*/}
                        <br/>
                        <span>{this.state.searchMessage}</span>                    
                        <PasswordList savedPasswords={this.state.savedPasswords} searchString={this.state.searchString} />
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