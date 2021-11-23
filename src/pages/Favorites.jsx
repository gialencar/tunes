import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favorites: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
    console.log('did mount');
  }

  fetchFavoriteSongs = async () => {
    this.setState(
      { loading: true },
      async () => {
        const favorites = await getFavoriteSongs();
        // console.log(favorites);
        this.setState({ favorites, loading: false });
      },
    );
  }

  render() {
    const { favorites, loading } = this.state;

    return (
      <>
        <Header />
        {loading ? <Loading /> : (
          <div data-testid="page-favorites">
            {console.log('renderizando cards')}
            {console.log(favorites)}
            {favorites
              // .filter((song) => song.)
              .map(({ trackId, trackName, previewUrl }) => (
                <MusicCard
                  key={ trackId }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  trackId={ trackId }
                  isInFavorites={ favorites.some((f) => +f.trackId === trackId) }
                />
              ))}
          </div>)}
      </>
    );
  }
}
