import React from 'react';
import { Link } from 'react-router-dom';

const Matches = () => {
  return (
    <div id="matches"> I am matches
      <Link to="/"><div className="close-button"><button>X</button></div></Link>
    </div>
  );
};

export default Matches;