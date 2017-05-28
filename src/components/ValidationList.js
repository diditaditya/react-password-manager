import React from 'react';

import style from '../style/style';

const IsValidIcon = (props) => {
    if(props.isValid) {
        return (
            <i className="material-icons" style={{color: "springgreen"}} >done</i>
        );
    } else {
        return (
            <i className="material-icons" style={{color: "crimson"}} >clear</i>
        );
    }
}

class ValidationList extends React.Component {

    render() {
        return (
            <div>
                <ul className="mdl-list" style={style.listSmall} >
                    <li className="mdl-list__item" style={style.listSmall}>
                        <IsValidIcon isValid={this.props.validation.isCapitalLetter}/>
                        Password must contain at least one capital letter
                    </li>
                    <li className="mdl-list__item" style={style.listSmall}>
                        <IsValidIcon isValid={this.props.validation.isNumber}/>
                        Password must contain at least one number
                    </li>
                    <li className="mdl-list__item" style={style.listSmall}>
                        <IsValidIcon isValid={this.props.validation.isSpecialChar}/>
                        Password must contain at least one special character
                    </li>
                    <li className="mdl-list__item" style={style.listSmall}>
                        <IsValidIcon isValid={this.props.validation.isLongerThan5}/>
                        Password must be at least 6 characters long
                    </li>
                </ul>
            </div>
        );
    }
}

export default ValidationList;