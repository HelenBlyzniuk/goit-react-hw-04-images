import { Component } from 'react';
import PropTypes from 'prop-types';
import css from 'components/Searchbar/Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchName.trim() === '') {
      alert('Input your search goal');

      return;
    }
    this.props.onSubmit(this.state.searchName);
  };

  handleInput = e => {
    this.setState({
      searchName: e.currentTarget.value.toLowerCase(),
    });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            onChange={this.handleInput}
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="input"
            value={this.state.searchName}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
