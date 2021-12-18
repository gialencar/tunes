import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      album: undefined,
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.fetchAlbum();
    this.fetchFavorites();
  }

  fetchAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    this.setState({ album });
    // console.log(id, album);
  }

  fetchFavorites = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ loading: false, favorites });
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
    const { album, loading, favorites } = this.state;
    console.log('render > favorites : ', favorites);

    return (
      <div>
        <Header />
        {loading ? <Loading /> : (
          album && (
            <div data-testid="page-album">
              <div>
                <img src={ album[0].artworkUrl100 } alt="" />
                <h3 data-testid="album-name">{album[0].collectionName}</h3>
                <h4 data-testid="artist-name">{album[0].artistName}</h4>
              </div>

              {album
                .filter((entry) => entry.kind === 'song')
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
            </div>
          )
        ) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
