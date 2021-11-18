import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      album: '',
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
        <div data-testid="page-album">{console.log(album)}</div>
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
