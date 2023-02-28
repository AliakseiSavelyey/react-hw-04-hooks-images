import React, { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import Button from 'components/Button';
import ImageLoader from 'components/Loader/Loader';
import imagesApi from './components/services/imagesApi';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    largeImg: '',
    error: null,
    loading: false,
    found: true,
  };

  componentDidUpdate(prevState, prevProps) {
    if (this.state.page > 2) {
      const { scrollTop, clientHeight } = document.documentElement;
      window.scrollTo({
        top: scrollTop + clientHeight - 165,
        behavior: 'smooth',
      });
    }

    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true });
    imagesApi
      .fetchImagesWithQuery(searchQuery, page)
      .then(images => {
        if (images.length === 0) {
          this.setState({ found: false });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
            page: prevState.page + 1,
            found: true,
          }));
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
    if (page > 1) {
      const { scrollHeight } = document.documentElement;
      window.scrollTo({
        top: scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  handleSearchFormSubmit = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
    });
  };

  handleBigImg = largeImg => {
    this.setState({ largeImg });
    document.body.classList.add('modal-isOpen');
  };

  closeModal = () => {
    this.setState({
      largeImg: '',
    });
    document.body.classList.remove('modal-isOpen');
  };

  render() {
    const { images, loading, error, found, largeImg } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {(error || !found) && !images.length && (
          <h2 style={{ textAlign: 'center' }}>WARRNING!!! WRONG WARRNING!!!</h2>
        )}
        <ImageGallery images={images} handleBigImg={this.handleBigImg} />
        {loading && <ImageLoader />}
        {images.length > 0 && !loading && found && (
          <Button onClick={this.fetchImages} />
        )}
        {largeImg && <Modal largeImg={largeImg} closeModal={this.closeModal} />}
      </>
    );
  }
}

export default App;
