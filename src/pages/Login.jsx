import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import trybeTunes from '../images/trybeTunes.png';
import tw from '../helpers/tailwind';

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
      <div
        className={ tw(
          'h-screen',
        ) }
      >
        <main data-testid="page-login" className="pt-18">
          <img src={ trybeTunes } alt="logo" />
          <form
            className={ tw(
              'flex flex-col items-stretch',
              'gap-5 p-16',
            ) }
          >
            <label htmlFor="name">
              {/* Nome */}
              <input
                className={ tw(
                  'rounded-full py-2 px-4',
                  'w-full',
                  'text-grey-800 border-solid border-2 border-gray-200',
                ) }
                type="text"
                data-testid="login-name-input"
                id="name"
                name="name"
                placeholder="Nome"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>

            <button
              type="submit"
              data-testid="login-submit-button"
              className={ tw(
                'py-2 px-4 mx-14',
                'rounded-full',
                'shadow-sm text-white bg-gradient-to-r from-green-500 to-cyan-500',
              ) }
              disabled={ loginBtnDisabled }
              onClick={ this.loginBtnClickHandler }
            >
              Entrar
            </button>
          </form>
          {loading && <Loading />}
        </main>
      </div>
    );
  }
}
