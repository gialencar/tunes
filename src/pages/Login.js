import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loginBtnDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const minLength = 3;

    this.setState({
      [name]: value,
      loginBtnDisabled: value.length < minLength,
    });
  };

  loginBtnClickHandler = () => {
    const { name } = this.state;
    createUser({ name });
  };

  render() {
    const { name, loginBtnDisabled } = this.state;

    return (
      <div data-testid="page-login">
        <label htmlFor="name">
          Nome
          <input
            type="text"
            data-testid="login-name-input"
            id="name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ loginBtnDisabled }
          onClick={ this.loginBtnClickHandler }
        >
          Entrar
        </button>
      </div>
    );
  }
}
