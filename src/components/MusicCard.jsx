import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { addSong, removeSong } from '../services/favoriteSongsAPI';
// import Loading from './Loading';

export default class MusicCard extends Component {
  onChange = () => {
    const { trackName, previewUrl, trackId, handleChange } = this.props;
    const song = { trackId, trackName, previewUrl };
    handleChange(song);
  }

  render() {
    const { trackName, previewUrl, trackId, isInFavorites } = this.props;

    return (
      <div>
        <span>{trackName}</span>
        <audio src={ previewUrl } controls data-testid="audio-component">
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>

        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            id={ trackId }
            checked={ isInFavorites }
            onChange={ this.onChange }
            data-testid={ `checkbox-music-${trackId}` }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  isInFavorites: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};
