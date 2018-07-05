import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
  pendingUsers: store.matches.pendingUsers,
});

const Voting = (props) => {
  return (
    <div id="voting-container">
      <div id="route-buttons">
        <Link to="/settings"><div className="settings-link"><button>Settings</button></div></Link>
        <Link to="/matches"><div className="matches-link"><button>Matches</button></div></Link>
      </div>
      <img id="homePic" alt="Vote On Me" src={props.pendingUsers[0].avatar_url} />
      <div id="voting-buttons">
        <button id="ignore">Git Ignore</button>
        <button id="commit">Git Commit</button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Voting);