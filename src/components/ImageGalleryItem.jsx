import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <div className={css.galleryItem} onClick={() => onClick(image.largeImageURL)}>
      <img className={css.imgList} src={image.webformatURL} alt="" />
    </div>
  );
};

export default ImageGalleryItem;