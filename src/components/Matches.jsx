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
  constructor(props) {
    super(props);
    this.state = { fetchedNone: false };
  }

  componentDidMount() {
    fetch('/matches', {
      method: 'POST',
      body: JSON.stringify({ mylogin: this.props.userLogin }),
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((users) => {
        console.log('client match response:', users);
        if (users.none) this.state.fetchedNone = true;
        else this.props.loadMatches(users);
      });
  }

  render() {
    if (this.props.matches.length && !this.state.fetchedNone) {
      const matchRender = this.props.matches.map(m => (
        <div className="matched-user">
          <img src={m.avatar_url} alt="Matched avatar" />
          <div className="matched-text">
            <h4>{m.login}</h4>
            <h4>Followers: {m.followers}</h4>
          </div>
        </div>
      ));
      return (
        <div id="matches">
          <Link to="/"><div className="close-button"><button>X</button></div></Link>
          {matchRender}
        </div>
      );
    } else if (this.state.fetchedNone) {
      return (
        <div id="matches">
          <Link to="/"><div className="close-button"><button>X</button></div></Link>
          <h4>You have no matches. Sad.</h4>
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
