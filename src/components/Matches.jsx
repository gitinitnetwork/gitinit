import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  userLogin: store.matches.userLogin,
  matches: store.matches.matches,
});

const mapDispatchToProps = dispatch => ({
  loadMatches: users => dispatch(actions.loadMatches(users)),
});

class Matches extends Component {
  componentDidMount() {
    fetch('/matches', {
      method: 'POST',
      body: { mylogin: this.props.userLogin },
    })
    .then(res => res.json())
    .then((users) => { this.props.loadMatches(users); });
  }

  render() {
    if (this.props.matches.length) {
      const matchRender = this.props.matches.map(m => (
        <div className="matched-user">
          <h4>{m.login}</h4>
          <h4>Followers: {m.followers}</h4>
          <img src={m.avatar_url} alt="Matched avatar" />
        </div>
      ));
      return (
        <div id="matches">
          <Link to="/"><div className="close-button"><button>X</button></div></Link>
          {matchRender}
        </div>
      );
    }
    return (
      <div id="matches">
        <Link to="/"><div className="close-button"><button>X</button></div></Link>
        <h4>Loading matches...</h4>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
