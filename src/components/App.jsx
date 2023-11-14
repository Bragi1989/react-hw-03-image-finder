import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import css from './App.module.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=39495070-5ff071e483d3b47d3211eb1ad`
        );

        const newImages = response.data.hits;

        setImages((prevImages) => [...prevImages, ...newImages]);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setVisibleCount(12);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setVisibleCount((prevCount) => prevCount + 12);
  };

  const handleImageClick = (largeImageUrl) => {
    setModalImage(largeImageUrl);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  return (
    <div className={css.container}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} visibleCount={visibleCount} />
      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}
      {modalImage && (
        <Modal isOpen={!!modalImage} onClose={handleCloseModal} imageUrl={modalImage} className={css.modal} />
      )}
    </div>
  );
};

export default App;