import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Config from './pages/Config';

const App: FC = () => {
  if (window.location.search.length !== 0) {
    const search = window.location.search.substring(1);
    const params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    Object.keys(params).forEach(key => {
      if (params[key].trim().length !== 0) {
        localStorage.setItem(key, decodeURIComponent(params[key]));
      }
    });
    window.location.href = '/';
  }

  return (
    <Router>
      <Switch>
        <Route path='/config'>
          <Config />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
