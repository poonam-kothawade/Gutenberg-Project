import React, { Component } from 'react';
import styles from './books.css';
import {FaArrowLeft,FaSearch} from 'react-icons/fa';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

class Books extends Component {
  static finalArray=[];

  state={
    bookArray:[]
  }
  componentDidMount(){
    this.bookAPI('Mount');
  }

  searchHandler(e){
    if(e.key=='Enter'){
      const value='http://skunkworks.ignitesol.com:8000/books/?mime_type=image%2F&&search='+e.target.value;
      axios.get(value)
      .then(response=>{
        this.setState({
          bookArray:response.data.results
        });
      });
    }
  }

  bookAPI(e){
    if(e=='Mount'||e.target.value==''){
      axios.get('http://skunkworks.ignitesol.com:8000/books/?mime_type=image%2F')
      .then(response=>{
        const htmlArray=[];
        const pdfArray=[];
        const textArray=[];
        const zipArray=[];
        const arrayValue=response.data.results;
        arrayValue.map(element=>{
          if(element.formats['text/html; charset=utf-8']||element.formats['text/html; charset=iso-8859-1']){
            htmlArray.push(element);
          }
          else if(element.formats['application/pdf']){
            pdfArray.push(element);
          }
          else if(element.formats['text/plain; charset=utf-8']||element.formats['text/plain; charset=us-ascii']){
            textArray.push(element);
          }
          else if(element.formats['application/zip']){
            element.zip=true;
            zipArray.push(element);
          }
        });
        Books.finalArray.push(...htmlArray);
        Books.finalArray.push(...pdfArray);
        Books.finalArray.push(...textArray);
        Books.finalArray.push(...zipArray);
        this.setState({
          bookArray:Books.finalArray
        });
      });
    }
  }
  zipFileHandler(){
    alert("Zip files are NOT viewable files");
  }


  render() {
    return (
        <div className={styles.booksContainer} id="container">
          <div className={styles.heading}>
            <span className={styles.iconStyles} onClick={this.props.history.goBack}><FaArrowLeft size='48px'/>{this.props.match.params.genreName}</span><br/>
            <div className={styles.searchContainer}>
              <input type='search' placeholder='Search' className={styles.searchBox} onKeyDown={this.searchHandler.bind(this)} onChange={this.bookAPI.bind(this)}/>
              <FaSearch className={styles.searchIcon}/>
            </div>
            
          </div>
          <Grid container spacing={2} className={styles.displayBooks}>
            {this.state.bookArray.map(book=>{
              return <Grid key={book.id} item xs={4} sm={3} lg={2}>
              <a href={book.formats['text/html; charset=utf-8']
              ||book.formats['text/html; charset=iso-8859-1']
              ||book.formats['application/pdf']
              ||book.formats['text/plain; charset=utf-8']
              ||book.formats['text/plain; charset=us-ascii']} 
              target={book.zip?null:'_blank'} 
              onClick={book.zip?this.zipFileHandler:null}>

                <figure>
                  <img src={book.formats['image/jpeg']} alt='' className={styles.bookImage}/>
                  <figcaption>
                    <h4 className={styles.booktitle}>{book.title}</h4>
                    {book.authors.map(author=><h4 className={styles.bookAuthor}>{author.name}</h4>)}
                  </figcaption>
                </figure>
              </a>
            </Grid>
            })}
          </Grid>
        </div>
    );
  }
}

export default Books;