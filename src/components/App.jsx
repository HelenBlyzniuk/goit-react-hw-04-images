import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import css from './App.module.css';

export function App() {
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [btnloadMore, setBtnloadMore] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = value => {
    if (searchName === value) {
      return;
    }
    setSearchName(value);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const handleClick = e => {
    setPage(page + 1);
  };

  const handleImageClick = ({ largeImageURL, tags }) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    setShowModal(true);
  };

  const handleModalClick = () => {
    setShowModal(false);
  };

  const URL = 'https://pixabay.com/api/';
  const KEY = '34953868-e619b94b5038a72e794119bd3';

  useEffect(() => {
    if (searchName === '') {
      return;
    }
    setStatus('pending');
    fetch(
      `${URL}?q=${searchName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('There are no images on your request');
      })

      .then(data => {
        setImages(p => [...p, ...data.hits]);
        setBtnloadMore(page < Math.ceil(data.totalHits / 12));
        setStatus('resolved');
      })
      .catch(({ message: error }) => {
        setError(error);
        setStatus('rejected');
        setBtnloadMore(false);
      });
  }, [searchName, page]);

  return (
    <div className={css.app}>
      <Searchbar onSubmit={onSubmit} />
      {images.length !== 0 && (
        <ImageGallery images={images} handleImageClick={handleImageClick} />
      )}
      {btnloadMore && { status } !== 'pending' && (
        <Button handleClick={handleClick} />
      )}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <div>{error}</div>}

      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          handleModalClick={handleModalClick}
        />
      )}
    </div>
  );
}
