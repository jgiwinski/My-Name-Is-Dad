import React from 'react';
import './App.css';
import Header from '../Header/Header';
import DadJoke from '../Joke/Joke';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import SearchedDadJokes from '../SearchedDadJokes/SearchedDadJokes';
import { Route, Switch, Link } from 'react-router-dom';
import lawn from './fatherly-mowerscene.gif';
import './animista.css'; 

const App = () => {
  return (
    <div>
      <Header />
        <Switch>
          <Route exact path='/' render={() => <DadJoke/> }/>
          <Route exact path='/search' render={() => {
            return (
              <div className='search-page'>
                <section className='search-form'>
                    <SearchForm />
                    <SearchedDadJokes />
                </section>
                <img className='lawn' alt='dad mowing the lawn' src={lawn}></img>
              </div>
            )
          }} />
        <Route render={() => <Link to='/' className='lost-error' aria-label='error page'><h2> 404: Please click here to find your dad.</h2></Link>}/>
        </Switch>
      <Footer />
    </div>
  );
}

export default App;
