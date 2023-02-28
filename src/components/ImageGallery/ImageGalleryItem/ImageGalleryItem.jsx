import React from 'react';
import './ImageGalleryItem.scss';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  handleBigImg,
}) => {
  const name = tags.split(',')[0];
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => handleBigImg(largeImageURL)}
    >
      <img src={webformatURL} alt={name} className="ImageGalleryItemImage" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  handleBigImg: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
