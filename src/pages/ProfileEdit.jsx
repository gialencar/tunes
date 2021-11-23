import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      saveBtnDisabled: true,
      redirect: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  validateForm = () => {
    /* fonte do regex pattern para validar email
    https://www.w3resource.com/javascript/form/email-validation.php */
    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { name, email, description, image } = this.state;

    if (name && email && description && image && email.match(emailFormat)) {
      this.setState({ saveBtnDisabled: false });
    } else {
      this.setState({ saveBtnDisabled: true });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.validateForm();

    this.setState({
      [name]: value,
    });
  };

  fetchUser = async () => {
    this.setState({
      loading: true,
    },
    async () => {
      const user = await getUser();
      this.setState({ ...user, loading: false });
      this.validateForm();
    });
  }

  saveProfile = async (e) => {
    e.preventDefault();
    const { name, email, description, image } = this.state;

    this.setState({ loading: true }, async () => {
      await updateUser({
        name,
        email,
        description,
        image,
      });
      this.setState({ redirect: true });
    });
  }

  render() {
    const {
      name, email, description, image, saveBtnDisabled, redirect, loading } = this.state;

    if (redirect) return <Redirect to="/profile" />;

    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          {loading ? <Loading /> : (
            <form action="">
              <label htmlFor="name">
                Nome
                <input
                  type="text"
                  name="name"
                  id="name"
                  data-testid="edit-input-name"
                  placeholder="nome"
                  onChange={ this.handleChange }
                  value={ name }
                />
              </label>

              <label htmlFor="email">
                Email
                <input
                  type="text"
                  name="email"
                  id="email"
                  data-testid="edit-input-email"
                  placeholder="email"
                  onChange={ this.handleChange }
                  value={ email }
                />
              </label>

              <label htmlFor="description">
                Descrição
                <input
                  type="text"
                  name="description"
                  id="description"
                  data-testid="edit-input-description"
                  placeholder="descrição"
                  onChange={ this.handleChange }
                  value={ description }
                />
              </label>

              <label htmlFor="image">
                Foto
                <input
                  type="text"
                  name="image"
                  id="image"
                  data-testid="edit-input-image"
                  placeholder="url"
                  onChange={ this.handleChange }
                  value={ image }
                />
              </label>

              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ saveBtnDisabled }
                onClick={ this.saveProfile }
              >
                Salvar
              </button>
            </form>)}

        </div>
      </>
    );
  }
}
