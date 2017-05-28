import React from 'react';
import { connect } from 'react-redux';

import PasswordList from './PasswordList';
import { fetchPasswords } from '../store/passwordAction';
import style from '../style/style';
import '../App.css';

class SearchPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            pattern: ''
        }
    }

    searchStringChange(e) {
        let string = e.target.value;
        let arr = string.split('');
        let newArr = [];
        arr.map((char) => {
            if(/[-?.\])(\[+\]\*]/.test(char)) {
                let newChar = "\\"+char;
                newArr.push(newChar);
            } else {
                newArr.push(char);
            }
        });
        this.setState({
            searchString: string,
            pattern: newArr.join('')
        });

    }

    search() {
        if(this.state.searchString.length > 0) {
            console.log(this.state.searchString);
        }
    }

    render() {
        if(this.props.savedPasswords) {
            return (
                    <div className="mdl-grid" >
                        <div className="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--1-col-phone"></div>
                        <div className="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--10-col-phone">
                            <fieldset style={style.bordered}>
                                <legend><h5>Saved Passwords</h5></legend>
                                <div className={style.textField} >
                                    <input className={style.input} type="text" value={this.state.searchString} onChange={(e)=> this.searchStringChange(e)} id="searchString" />
                                    <label className={style.label} htmlFor="searchString">Filter Keyword</label>
                                </div>
                                <span>    </span>
                                <br/>
                                <PasswordList savedPasswords={this.props.savedPasswords} searchString={this.state.pattern} />
                            </fieldset>
                        </div>
                        <div className="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--1-col-phone"></div>
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