import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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

  handleChange = async (song) => {
    const { favorites } = this.state;
    const inFav = favorites.some((f) => +f.trackId === +song.trackId);

    this.setState({ loading: true }, async () => {
      if (inFav) {
        await removeSong(song);
        console.log('removed ', song.trackId);
        this.setState({ favorites: favorites.filter((f) => f.trackId !== song.trackId) });
      } else {
        await addSong(song);
        console.log('added ', song.trackId);
        this.setState((prevState) => ({
          favorites: [...prevState.favorites, song],
        }));
      }

      this.setState({ loading: false });
    });
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
                  handleChange={ this.handleChange }
                />
              ))}
          </div>)}
      </>
    );
  }
}
