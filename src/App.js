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
        <div>
          <PasswordForm/>
          <SearchPassword/>
        </div>
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
