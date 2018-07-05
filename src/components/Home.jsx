import React from 'react';
import { bindActionCreators } from 'redux'
import styles from '../styles.css';





const Home = (props) => {
console.log(props);
  return (
    <div id="container">
    <img id="homePic"
      src={props.sampleUsers[0].avatar_url} />
    </div>
  );
};









