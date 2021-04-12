import React, { Component } from 'react';
import styles from './genre.css';
import {FaArrowRight} from 'react-icons/fa';
import { Link } from 'react-router-dom';

class Genre extends Component {
  render() {
    return (
      <Link to={'/genre/books' + this.props.genreName} className={styles.Genre}>
          <p className={styles.genreText}>
          <span className={styles.iconsGenre}>{this.props.genreIcon}</span>
          {this.props.genreName}
          <span className={styles.arrowRight}><FaArrowRight/></span></p>
      </Link>
    );
  }
}

export default Genre;
