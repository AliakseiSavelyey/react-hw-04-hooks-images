import React from 'react';
import './ImageGallery.scss';
import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, handleBigImg }) => {
  const items = images.map(e => (
    <ImageGalleryItem
      key={e.id}
      webformatURL={e.webformatURL}
      largeImageURL={e.largeImageURL}
      tags={e.tags}
      handleBigImg={handleBigImg}
    />
  ));
  return <ul className="ImageGallery">{items}</ul>;
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  handleBigImg: PropTypes.func.isRequired,
};

export default ImageGallery;
