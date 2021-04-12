import React, { Component } from 'react';
import Genres from './components/genres/genres';
import {IconContext} from 'react-icons';
import {BrowserRouter,Route} from 'react-router-dom'; 
import Books from './components/genres/books/books';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <IconContext.Provider value={{color:'#5E56E7', size:'20px'}}>
          <Route path='/genre/books:genreName' component={Books} exact/>
          <Route path='/' component={Genres} exact/>
        </IconContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
