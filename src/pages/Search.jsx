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
        <div
          data-testid="page-search"
          className="pt-24 mx-2 flex flex-col justify-center"
        >
          <div className="flex justify-center">
            <label htmlFor="query">
              <input
                type="text"
                value={ searchQuery }
                id="query"
                name="searchQuery"
                onChange={ this.handleChange }
                data-testid="search-artist-input"
                placeholder="artista"
                className={ tw(
                  'rounded-full py-2 px-4',
                  // 'w-full',
                  'text-grey-800 border-solid border-2 border-gray-200',
                ) }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ searchBtnDisabled }
              onClick={ this.search }
              className={ tw(
                'py-2 px-4 ml-4',
                'rounded-full',
                'shadow-sm text-white bg-gradient-to-r from-green-500 to-green-600',
              ) }
            >
              Pesquisar
            </button>
          </div>

          {albums.length ? (
            <div
              className="flex flex-col items-center
             md:flex-row md:flex-wrap md:justify-between md:items-start md:px-52"
            >
              <div className="my-4 text-2xl block w-full">{result}</div>
              {albums.map((album) => (
                <div className="py-4 w-72" key={ album.collectionId }>
                  {/* TODO: refactor into separate component */}
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                    className="flex flex-col rounded-xl overflow-hidden
                     bg-green-600 text-white shadow-lg md:flex-grow"
                  >
                    <img
                      src={ album.artworkUrl100 }
                      alt={ album.collectionName }
                      className=""
                    />
                    <p className="text-green-800 bg-green-400 pl-3">{album.artistName}</p>
                    <h4
                      className=" text-green-100 font-bold
                    text-lg py-2 px-3"
                    >
                      {album.collectionName}
                    </h4>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}
