import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import App from './App';
import Header from './components/Header';
import { PasswordForm } from './components/PasswordForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('<App />', () => {
  it('should render Header component', () => {
    const component = shallow(<App />);
    expect(component.contains(<Header />)).toBe.true;
  });

});

describe('<PasswordForm />', () => {

  const form = shallow(<PasswordForm />);

  beforeEach(() => {
    form.setProps({savedPasswords: []});
    form.setState({url: ''});
    form.setState({username: ''});
    form.setState({password: ''});
  });

  it('should have state called "password", and it is empty', () => {
    let password = form.state('password');
    expect(password).toHaveLength(0);
  });

  it('should render legend "Save New Password"', () => {
    let legend = form.find('h5');
    expect(legend.text()).toBe("Save New Password");
  });

  it('should render button "Save" to submit the inputs', () => {
    let button = form.find('#submitButton');
    expect(button.text()).toBe('Save');
  });

  it('should render input elements to input the url, username, and password', () => {
    let inputUrl = form.find('#url');
    let inputUsername = form.find('#username');
    let inputPassword = form.find('#password');
    expect(inputUrl).toBe.true;
    expect(inputUsername).toBe.true;
    expect(inputPassword).toBe.true;
  });

  it('should change the state.url to "www.wawawa.com" when url input is filled with "www.wawawa.com"', () => {
    let input = form.find('#url');
    input.simulate('change', { target: {value: "www.wawawa.com"}});
    expect(form.state('url')).toBe('www.wawawa.com');
  });

  it('should change the state.username to "wawa" when username input is filled with "wawa"', () => {
    let input = form.find('#username');
    input.simulate('change', { target: {value: "wawa"}});
    expect(form.state('username')).toBe('wawa');
  });

  it('should change the state.password to "Abcdef@123" when url input is filled with "Abcdef@123"', () => {
    let input = form.find('#password');
    input.simulate('change', { target: {value: "Abcdef@123"}});
    expect(form.state('password')).toBe('Abcdef@123');
  });

  it('should change the message to "url, username, and password are required" if empty input is submitted"', () => {
    form.setState({
      url: 'www.wawawa.com',
      username: 'wawa',
      password: ''
    });
    let button = form.find('button');
    button.simulate('click');
    let message = form.state('message');
    expect(message).toBe('url, username, and password are required');
  });

  it('should change the message to "please satisfy the validation requirement" if password is "Abcdefg123"', () => {
    form.setState({
      url: 'www.wawawa.com',
      username: 'wawa',
      password: 'Abcdefg123'
    });
    let button = form.find('button');
    button.simulate('click');
    let message = form.state('message');
    expect(message).toBe('please satisfy the validation requirement');
  });

  it('should change the message to "please satisfy the validation requirement" if password is "Ab$defg"', () => {
    form.setState({
      url: 'www.wawawa.com',
      username: 'wawa',
      password: 'Ab$defg'
    });
    let button = form.find('button');
    button.simulate('click');
    let message = form.state('message');
    expect(message).toBe('please satisfy the validation requirement');
  });

  it('should change the message to "please satisfy the validation requirement" if password is "@bcdefg123"', () => {
    form.setState({
      url: 'www.wawawa.com',
      username: 'wawa',
      password: '@bcdefg123'
    });
    let button = form.find('button');
    button.simulate('click');
    let message = form.state('message');
    expect(message).toBe('please satisfy the validation requirement');
  });


});
