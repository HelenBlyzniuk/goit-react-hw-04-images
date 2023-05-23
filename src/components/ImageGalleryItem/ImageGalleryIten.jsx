import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  handleClick,
}) {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.galleryItemImage}
        src={webformatURL}
        alt={tags}
        width="300"
        onClick={() => handleClick({ largeImageURL, tags })}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
