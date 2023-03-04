import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SearchBar }  from '../Searchbar/Searchbar'
import {ImageGallery} from '../ImageGallery/ImageGallery'
import { fetchData } from '../Api/Api'
import { Button } from '../Button/Button'
import { Container } from './App.styled'
import { Modal} from '../Modal/Modal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Loader} from '../Loader/Loader'

export function App () {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [total, setTotal] = useState(0);
  const [tags, setTags] = useState('');


  useEffect(() => {

  if (!query) return;
    
  const fetchImages = (query, page) => {
    const perPage = 12;
    setIsLoading(true);
   
    fetchData(query, page, perPage)
      .then(({ hits, totalHits }) => {
        const totalPages = Math.ceil(totalHits / perPage);

        const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });
        console.log(data);
        setImages(images => [...images, ...data]);
        setTotal(totalHits);

       
        if (hits.length === 0) {
          return toast.error('Sorry, no images found. Please, try again!');
        }

        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }

        if (page === totalPages) {
          toast.info("You've reached the end of search results.");
        }
        if (page !== 1) {
          scrollOnLoadButton();
        }
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
    };
    
    fetchImages(query, page);
    
},[query, page]);



  const handleSearch = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const toggleModal = (largeImageURL, tags) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  // / Скролл при клике на кнопку
  const scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const loadImages = images.length !== 0;
  const isLastPage = images.length === total;
  const loadMoreBtn = loadImages && !isLoading && !isLastPage;

  return (

    <Container>
      <SearchBar onSubmit={handleSearch} />

      {error && toast.error(error.message)}

      {isLoading && <Loader />}

      {loadImages && <ImageGallery images={images} onClick={toggleModal} />}

      {loadMoreBtn && <Button onClick={onLoadMore}>Load more</Button>}
      {/* <Button onClick={onLoadMore}>Load more</Button> */}

      {showModal && (
        <Modal onClose={toggleModal}>
         <img src={largeImageURL} alt={tags} />
        </Modal>
      )}

      <ToastContainer theme="colored" position="top-right" autoClose={3000} />
    </Container>
  );

}