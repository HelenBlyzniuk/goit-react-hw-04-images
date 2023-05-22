import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    return (
      <li className={css.galleryItem}>
        <img
          className={css.galleryItemImage}
          src={webformatURL}
          alt={tags}
          width="300"
          onClick={() => this.props.handleClick({ largeImageURL, tags })}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
