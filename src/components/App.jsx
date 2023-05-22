import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchName: '',
    page: 1,
    images: [],
    error: null,
    status: 'idle',
    btnloadMore: false,
    largeImageURL: null,
    tags: null,
    showModal: false,
  };

  onSubmit = value => {
    if (this.state.searchName === value) {
      return;
    }
    this.setState({
      searchName: value,
      page: 1,
      images: [],
      error: null,
    });
  };

  handleClick = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = ({ largeImageURL, tags }) => {
    console.log(largeImageURL, tags);
    this.setState({ largeImageURL, tags, showModal: true });
  };

  handleModalClick = () => {
    this.setState({ showModal: false });
  };

  URL = 'https://pixabay.com/api/';
  KEY = '34953868-e619b94b5038a72e794119bd3';

  componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;
    if (prevState.searchName !== searchName || prevState.page !== page) {
      this.setState({ status: 'pending' });

      fetch(
        `${this.URL}?q=${searchName}&page=${page}&key=${this.KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          throw new Error('There are no images on your request');
        })
        .then(data =>
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            btnloadMore: page < Math.ceil(data.totalHits / 12),
            status: 'resolved',
          }))
        )
        .catch(({ message: error }) =>
          this.setState({ error, status: 'rejected', btnloadMore: false })
        );
    }
  }
  render() {
    const {
      images,
      status,
      error,
      btnloadMore,
      largeImageURL,
      tags,
      showModal,
    } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />
        {images.length !== 0 && (
          <ImageGallery
            images={images}
            handleImageClick={this.handleImageClick}
          />
        )}
        {btnloadMore && status !== 'pending' && (
          <Button handleClick={this.handleClick} />
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <div>{error}</div>}

        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            handleModalClick={this.handleModalClick}
          />
        )}
      </div>
    );
  }
}
