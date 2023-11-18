import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import css from './App.module.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      images: [],
      page: 1,
      isLoading: false,
      modalImage: null,
      visibleCount: 12,
    };
  }
  

  componentDidUpdate(prevProps, prevState) { a
    const { query, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.fetchImages(query, page);
    }
  }

  fetchImages = async (query, page) => {
    if (!query) return;

    try {
      this.setState({ isLoading: true });

      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=39495070-5ff071e483d3b47d3211eb1ad`
      );

      const newImages = response.data.hits;

      if (newImages.length === 0) {
        console.log('No images found for the given query.');
        return;
      }

      this.setState((prevState) => ({
        images: [...prevState.images, ...newImages],
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = (newQuery) => {
    const { query } = this.state;

    if (newQuery !== query) {
      this.setState({
        query: newQuery,
        page: 1,
        images: [],
        visibleCount: 12,
      });
    }
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
      visibleCount: prevState.visibleCount + 12,
    }));
  };

  handleImageClick = (largeImageUrl) => {
    this.setState({ modalImage: largeImageUrl });
  };

  handleCloseModal = () => {
    this.setState({ modalImage: null });
  };

  render() {
    const { query, images, isLoading, modalImage, visibleCount } = this.state;

    return (
      <div className={css.container}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} visibleCount={visibleCount} />
        {images.length > 0 && !isLoading && <Button onClick={this.handleLoadMore} />}
        {isLoading && <Loader />}
        {modalImage && (
          <Modal isOpen={!!modalImage} onClose={this.handleCloseModal} imageUrl={modalImage} className={css.modal} />
        )}
      </div>
    );
  }
}

export default App;