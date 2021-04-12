import React, { Component } from 'react';
import styles from './genres.css'
import Genre from './genre/genre';
import {FaAsymmetrik,FaDelicious,FaFortAwesome,FaHubspot,FaLaravel,FaMedrt,FaRebel} from 'react-icons/fa';


class Genres extends Component {
  genreArr=[
    {icon:<FaAsymmetrik/>,genreName:'Fiction'},
    {icon:<FaDelicious/>,genreName:'Drama'},
    {icon:<FaFortAwesome/>,genreName:'Humour'},
    {icon:<FaHubspot/>,genreName:'Politics'},
    {icon:<FaLaravel/>,genreName:'Philosophy'},
    {icon:<FaMedrt/>,genreName:'History'},
    {icon:<FaRebel/>,genreName:'Adventure'},
    {icon:<FaRebel/>,genreName:'Horror'}
  ];

  render() {
    return (
      <div className={styles.App}>
        <div className={styles.container}>
          <p className={styles.titleText}>Gutenberg Project</p>
          <p className={styles.titlePara}>A social cataloging website that allows you to freely search its database of books, annotations,
                  and reviews.</p>
          <div className={styles.genreHolder}>
            {this.genreArr.map(genre=>{
                return <Genre key={genre.genreName} genreIcon={genre.icon} genreName={genre.genreName}/>
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Genres;