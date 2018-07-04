import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

const Home = () => {

  return (
    <div id="container">
    <div id="homePic">
      <button type="button"><a href="https://github.com/login/oauth/authorize?client_id=d337730ee82c0f67d053&scope=user">Log in with Github</a></button>
    </div>
    </div>
  );
};



function mapStateToProps(state, props) {
  return {
    login: state.reducers.sampleusers.userName,
    avatar_url: state.reducers.sampleusers.userPhoto,
    followers: state.reducers.sampleusers.userBio
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


