import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  /*
  consultei esse artigo para resolver um warning
  https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component
  */
  mounted = false;

  constructor() {
    super();

    this.state = {
      name: '',
      loginBtnDisabled: true,
      loading: false,
      loggedIn: false,
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const minLength = 3;

    this.setState({
      [name]: value,
      loginBtnDisabled: value.length < minLength,
    });
  };

  loginBtnClickHandler = async (event) => {
    event.preventDefault();
    const { name } = this.state;

    this.setState({ loading: true }, async () => {
      await createUser({ name });
      if (this.mounted) this.setState({ loading: false, loggedIn: true });
    });
  };

  render() {
    const { name, loginBtnDisabled, loading, loggedIn } = this.state;

    if (loggedIn) return <Redirect to="/search" />;

    return (
      <div data-testid="page-login">
        <form>
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
        </form>
        {loading && <Loading />}
      </div>
    );
  }
}
