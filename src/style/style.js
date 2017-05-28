const center = {
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto"
};

const bordered = {
    border: "1px solid grey",
    borderRadius: 5,
    textAlign: "center",
    margin: "2.5%",
    padding: "2.5%"
}

const clickable = {
    cursor: "pointer"
}

const edit = {
    textAlign: "center",
    fontSize: "1em",
}

const biggerText = {
    fontSize: "1em"
}

const listSmall = {
    fontSize: "1em",
    textAlign: "left",
    margin: 0,
    padding: 0
}

const showPassword = {
    ...clickable,
    fontSize: 24,
    marginTop: 40
}

export default {
    standardButton: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent",
    table: "mdl-data-table mdl-js-data-table",
    textField: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label",
    input: "mdl-textfield__input",
    label: "mdl-textfield__label",
    center,
    bordered,
    clickable,
    edit,
    biggerText,
    listSmall,
    showPassword
};