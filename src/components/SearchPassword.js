import React from 'react';
import { connect } from 'react-redux';

import PasswordList from './PasswordList';
import { fetchPasswords } from '../store/passwordAction';
import style from '../style/style';

class SearchPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            searchMessage: ''
        }
    }

    searchStringChange(e) {
        let string = e.target.value;
        if(/[-?.\])(\[+]/.test(string)) {
            this.setState({
                searchString: '',
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
        if(this.props.savedPasswords) {
            return (
                    <div>
                        <fieldset style={style.bordered}>
                            <legend><h5>Saved Passwords</h5></legend>
                            <div className={style.textField} >
                                <input className={style.input} type="text" value={this.state.searchString} onChange={(e)=> this.searchStringChange(e)} id="searchString" />
                                <label className={style.label} htmlFor="searchString">Filter Keyword</label>
                            </div>
                            <span>    </span>
                            <br/>
                            <span>{this.state.searchMessage}<br/></span>
                            {/*<p>this.props.savedPasswords.length: {this.props.savedPasswords.length}</p>*/}
                            <PasswordList savedPasswords={this.props.savedPasswords} searchString={this.state.searchString} />
                        </fieldset>
                        
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
        // if(this.props.savedPasswords) {
        //     if(this.state.savedPasswords.length !== this.props.savedPasswords.length) {
        //         this.setState({
        //             savedPasswords: this.props.savedPasswords
        //         });
        //     }
        // }
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