import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import SuperHeroListManager from './containers/SuperHeroListManager';

import SuperHeroDetailManager from './containers/SuperHeroDetailManager/SuperHeroDetailManager';

const App = (props) => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className='App'>
      <header>
        <p className='title'>Find your Super Hero!</p>
        {props.location.pathname === '/' && (
          <input
            className='searchInput'
            type='text'
            placeholder='Search..'
            value={searchText}
            maxLength={15}
            onChange={(e) => setSearchText(e.target.value)}
          />
        )}
      </header>
      <main>
        <Switch>
          <Route
            exact
            path='/'
            render={(routrProps) => (
              <SuperHeroListManager searchText={searchText} {...routrProps} />
            )}
          />
          <Route exact path='/details/:id' component={SuperHeroDetailManager} />
        </Switch>
      </main>
    </div>
  );
};

export default withRouter(App);
