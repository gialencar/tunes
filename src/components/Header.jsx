import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import tw from '../helpers/tailwind';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userName: '',
      navHidden: true,
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

  toggleNav = () => {
    this.setState((prevState) => (
      { navHidden: !prevState.navHidden }
    ));
  }

  render() {
    const { loading, userName, navHidden } = this.state;
    return (
      <header
        data-testid="header-component"
        className={ tw(
          'bg-green-300',
        ) }
      >
        <h1>TrybeTunes</h1>

        {loading ? (
          '. . .'
        ) : (
          <h1 data-testid="header-user-name">{userName}</h1>
        )}

        <div className="block lg:hidden">
          <button
            type="button"
            className="flex items-center px-3 py-2 border rounded
            text-gray-500 border-gray-600 hover:text-white hover:border-white"
            onClick={ this.toggleNav }
          >
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <nav
          className={ tw(
            navHidden ? 'hidden' : '',
            'lg:flex lg:items-center',
            'pt-6 lg:pt-0',
            'w-full flex-grow lg:w-auto',
          ) }
          id="nav-content"
        >
          <ul className="lg:flex justify-end flex-1 items-center">
            <li>
              <Link
                to="/search"
                data-testid="link-to-search"
                className={ tw(
                  'text-lg text-gray-800',
                ) }
              >
                Pesquisa
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favoritas
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                data-testid="link-to-profile"
              >
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
