import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import styles from '../styles.css';
import Settings from './Settings.jsx'
import Matches from './Matches.jsx'
import Voting from './Voting.jsx'

const Home = (props) => {
  return (
    <BrowserRouter>
      <div id="home-container">
            <Switch>
                <Route exact path="/" render={() => <Voting />} />
                <Route exact path="/settings" render={() => <Settings />} />
                <Route exact path="/matches" render={() => <Matches />} />
            </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Home;









