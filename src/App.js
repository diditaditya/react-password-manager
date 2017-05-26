import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store/configureStore';

import Header from './components/Header';
import PasswordForm from './components/PasswordForm';
import SearchPassword from './components/SearchPassword';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <p className="App-intro">
          To get started, fill <code>password form</code> and save.
        </p>
        <PasswordForm/>
        <SearchPassword/>
      </div>
    );
  }
}

const AppWithStore = (props) => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  );
}

export default AppWithStore;
