import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import tw from '../helpers/tailwind';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userName: '',
      navVisible: false,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    // console.log(user);
    this.setState({ loading: false, userName: user.name });
    return user;
  };

  handleChange = (e) => {
    console.log(e.target);
    this.setState((prevState) => ({
      navVisible: !prevState.navVisible,
    }));
  };

  render() {
    const { loading, userName, navVisible } = this.state;
    const link = [
      'mb-4 ml-4 md:mb-0 md:mr-4',
      'hover:text-green-400',
    ];

    return (
      <header
        className={ tw(
          'flex justify-center text-center fixed w-full z-50 h-16',
          'md:grid grid-cols-[1fr_auto_minmax(600px,_1fr)_1fr]',
          'bg-gray-600 text-gray-100',
        ) }
        data-testid="header-component"
      >
        <h1 className="text-3xl self-center col-start-2">TrybeTunes</h1>
        {/* {loading ? 'Carregando...' : <h1 data-testid="header-user-name">{userName}</h1>} */}

        <label
          htmlFor="nav-toggle"
          className={ tw(
            'md:hidden flex items-center absolute top-0 left-0',
            'ml-4',
            'h-full',
          ) }
        >
          <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>

          <input
            type="checkbox"
            id="nav-toggle"
            className="hidden"
            checked={ navVisible }
            onChange={ this.handleChange }
          />
        </label>
        <nav
          className={ tw(
            navVisible ? 'scale-100' : 'scale-y-0',
            'transition-transform duration-500 ease-in-out origin-top',
            'absolute text-left top-full w-full',
            'left-0 m-0',
            'bg-gray-600 text-gray-100',
            'md:[all:unset] md:scale-100 md:top-0 md:w-0',
            'md:col-start-3 md:col-end-4 md:placeholder-opacity-100',
          ) }
        >
          <div
            className={ tw(
              navVisible
                ? 'transition-opacity delay-300 ease-in-out'
                : 'opacity-0 transition-opacity ease-in-out',
              'flex flex-col',
              'md:opacity-100 md:flex-row md:h-full md:justify-end md:items-center',
            ) }
          >
            <Link
              className={ tw(...link) }
              to="/search"
              data-testid="link-to-search"
            >
              Pesquisa
            </Link>
            <Link
              className={ tw(...link) }
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favoritas
            </Link>
            <Link
              className={ tw(...link) }
              to="/profile"
              data-testid="link-to-profile"
            >
              Perfil
            </Link>
          </div>
        </nav>
      </header>
    );
  }
}
