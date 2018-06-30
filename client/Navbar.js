import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div id="navbar" className="row">
      <div className="nlink">
        <Link to="/">Home</Link>
      </div>
      <div className="nlink">
        <Link to="/about">About Me</Link>
      </div>
      <div className="nlink">
        <Link to="/news">News</Link>
      </div>
    </div>
  );
};

export default Navbar;
