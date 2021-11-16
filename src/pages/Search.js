import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: '',
      searchBtnDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      searchBtnDisabled: value.length < 2,
    });
  }

  render() {
    const { searchQuery, searchBtnDisabled } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <label htmlFor="query">
            <input
              type="text"
              value={ searchQuery }
              id="query"
              name="searchQuery"
              onChange={ this.handleChange }
              data-testid="search-artist-input"
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ searchBtnDisabled }
          >
            Pesquisar
          </button>
        </div>
      </>
    );
  }
}
