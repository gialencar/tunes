import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      album: undefined,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    getMusics(match.params.id).then((response) => {
      this.setState({ album: response });
    });
  }

  render() {
    const { album } = this.state;

    return (
      <>
        <Header />
        {album && (
          <div data-testid="page-album">
            <div>
              <img src={ album[0].artworkUrl100 } alt="" />
              <h3 data-testid="album-name">{album[0].collectionName}</h3>
              <h4 data-testid="artist-name">{album[0].artistName}</h4>
            </div>

            {album.slice(1).map((music) => (
              <MusicCard
                key={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
              />
            ))}
          </div>
        )}
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
