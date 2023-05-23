import { useState } from 'react';
import PropTypes from 'prop-types';
import css from 'components/Searchbar/Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [searchName, setSearchName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (searchName.trim() === '') {
      alert('Input your search goal');
      return;
    }
    onSubmit(searchName);
  }

  function handleInput(e) {
    setSearchName(e.currentTarget.value.toLowerCase());
  }

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          onChange={handleInput}
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="input"
          value={searchName}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
