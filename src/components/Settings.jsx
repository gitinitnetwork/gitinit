import React from 'react';
import { Link } from 'react-router-dom';


const Settings = () => {
  return (
    <div id="settings-container"> I am settings 
      <Link to="/"><div className="close-button"><button>X</button></div></Link>
    </div>
  );
};

export default Settings;