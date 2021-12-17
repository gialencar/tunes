import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import tw from '../helpers/tailwind';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: '',
      searchBtnDisabled: true,
      loading: false,
      albums: [],
      result: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      searchBtnDisabled: value.length < 2,
    });
  };

  search = async () => {
    const { searchQuery } = this.state;

    this.setState({ searchQuery: '', loading: true }, async () => {
      const response = await searchAlbumsAPI(searchQuery);
      // console.log(response);
      const result = `Resultado de álbuns de: ${searchQuery}`;
      this.setState({ albums: response, loading: false, result });
    });
  };

  render() {
    const {
      searchQuery,
      searchBtnDisabled,
      loading,
      albums,
      result,
    } = this.state;

    return (
      <div>
        <Header />
        {loading && <Loading /> }
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
            onClick={ this.search }
          >
            Pesquisar
          </button>

          {albums.length ? (
            <div>
              <h3>{result}</h3>
              {albums.map((album) => (
                <div key={ album.collectionId }>
                  {/* TODO: refactor into separate component */}
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <img
                      src={ album.artworkUrl100 }
                      alt={ album.collectionName }
                    />
                    <h4>{album.collectionName}</h4>
                    <p>{album.artistName}</p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <h3>Nenhum álbum foi encontrado</h3>
          )}
        </div>
      </div>
    );
  }
}
