import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { isInFavorites } = this.props;
    if (isInFavorites) {
      this.toggleCheckbox();
    }
  }

  toggleCheckbox = () => {
    this.setState((prevState) => ({
      checked: !prevState.checked,
      loading: false,
    }));
  }

  handleChange = (event) => {
    const { id: trackId, checked } = event.target;

    this.setState({ loading: true }, async () => {
      if (checked) await addSong({ trackId });
      else await removeSong({ trackId });
      this.toggleCheckbox();
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { checked, loading } = this.state;

    return (
      loading
        ? <Loading />
        : (
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
                checked={ checked }
                onChange={ this.handleChange }
                data-testid={ `checkbox-music-${trackId}` }
              />
              Favorita
            </label>
          </div>
        )
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  isInFavorites: PropTypes.bool.isRequired,
};
