import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userName: '',
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

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        {loading ? (
          <Loading />
        ) : (
          <h1 data-testid="header-user-name">{userName}</h1>
        )}

        <nav>
          <Link to="/search" data-testid="link-to-search">
            Pesquisa
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            Favoritas
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}
