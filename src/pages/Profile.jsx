import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      user: undefined,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    // if (user) console.log(user.name);

    return (
      <>
        <Header />
        {!user ? <Loading /> : (
          <div data-testid="page-profile">

            <img
              src={ user.image }
              alt={ `Foto de ${user.name}` }
              data-testid="profile-image"
            />
            <Link to="/profile/edit">Editar perfil</Link>

            <h3>Nome</h3>
            <p>{user.name}</p>

            <h3>Email</h3>
            <p>{user.email}</p>

            <h3>Descrição</h3>
            <p>{user.description}</p>
          </div>
        )}
      </>
    );
  }
}
