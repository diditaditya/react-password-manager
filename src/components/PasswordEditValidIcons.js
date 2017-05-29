import React from 'react';

const color = (isValid) => {
    let style = {
        fontSize: 10
    }
    if(isValid) {
        style.color = "springgreen";
    } else {
        style.color = "crimson";
    }
    return style;
}

export const IsCapitalValidIcon = (props) => {
    let isValid = (string) => {
        return /[A-Z]/.test(string)
    }
    return (
        <span style={color(isValid(props.password))} title="Capital Letter"><b>ABC </b></span>
    );
}

export const IsLowercaseValidIcon = (props) => {
    let isValid = (string) => {
        return /[a-z]/.test(string)
    }
    return (
        <span style={color(isValid(props.password))} title="Lowercase Letter"><b>abc </b></span>
    );
}

export const IsNumberValidIcon = (props) => {
    let isValid = (string) => {
        return /[0-9]/.test(string)
    }
    return (
        <span style={color(isValid(props.password))} title="Number" ><b>123 </b></span>
    );
}

export const IsSpecialValidIcon = (props) => {
    let isValid = (string) => {
        return /[!@#$%^&*)(\-_+=}\]{\[|\\:;"'<,>.?\/]/.test(string)
    }
    return (
        <span style={color(isValid(props.password))} title="Special Character" ><b>!@# </b></span>
    );
}

export const IsLongValidIcon = (props) => {
    let isValid = (string) => {
        return string.length > 5
    }
    return (
        <span style={color(isValid(props.password))} title="Longer than 5 characters" ><b>>5</b></span>
    );
}
