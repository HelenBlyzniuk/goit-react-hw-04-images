import PropTypes from 'prop-types';
import css from './Button.module.css';
export const Button = ({ handleClick }) => {
  return (
    <button type="button" className={css.loadMore} onClick={handleClick}>
      Load More
    </button>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
