import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RouteConfig } from './routes/RouteConfig';

import { hot } from 'react-hot-loader';

function App() {
  return (
    <Router>
      <RouteConfig />
    </Router>
  );
}

export default hot(module)(App);
