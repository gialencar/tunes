import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      checked: false,
    };
  }

  handleChange = () => {
    this.setState((prevState) => ({
      checked: !prevState.checked,
    }));
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { checked } = this.state;

    return (
      <div>
        <span>{trackName}</span>
        <audio src={ previewUrl } controls data-testid="audio-component">
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>

        <label htmlFor={ trackName }>
          <input
            type="checkbox"
            name=""
            id={ trackName }
            checked={ checked }
            onChange={ this.handleChange }
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
};
