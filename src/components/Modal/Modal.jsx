import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ handleModalClick, largeImageURL, tags }) {
  const handleClick = e => {
    if (e.target.nodeName === 'IMG') {
      return;
    }
    handleModalClick();
  };

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        handleModalClick();
      }
    });
  }, []);

  useEffect(() => {
    return window.removeEventListener('keydown', handleModalClick);
  }, []);

  return createPortal(
    <div className={css.overlay} onClick={handleClick}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} width="500" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  handleModalClick: PropTypes.func.isRequired,
};

// export class Modal extends Component {
//   state = {};

//   handleClick = e => {
//     if (e.target.nodeName === 'IMG') {
//       return;
//     }
//     this.props.handleModalClick();
//   };

//   componentDidMount() {
//     window.addEventListener('keydown', e => {
//       if (e.code === 'Escape') {
//         this.props.handleModalClick();
//       }
//     });
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.props.handleModalClick);
//   }
//   render() {
//     const { largeImageURL, tags } = this.props;
//     return createPortal(
//       <div className={css.overlay} onClick={this.handleClick}>
//         <div className={css.modal}>
//           <img src={largeImageURL} alt={tags} width="500" />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }
// Modal.propTypes = {
//   largeImageURL: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
//   handleModalClick: PropTypes.func.isRequired,
// };
