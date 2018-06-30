import React from 'react';
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import Navbar from './Navbar';

function Main() {
  return (
    <div id="main">
      <HashRouter>
        <Navbar />
        {/* <Switch>
          <Route />
        </Switch> */}
      </HashRouter>
    </div>
  );
}

export default Main;
