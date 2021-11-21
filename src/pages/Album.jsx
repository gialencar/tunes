import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
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
  }

  fetchFavorites = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ loading: false, favorites });
  }

  render() {
    const { album, loading, favorites } = this.state;

    return (
      <>
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
                  />
                ))}
            </div>
          )
        ) }
      </>
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
