import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Search from '../pages/Search.jsx';
import Detail from '../pages/detail/Detail';
import Login from '../pages/Login';

const Routes = () => {
  return (
    <Switch>
      <Route path='/search' component={Search} />
      <Route path='/movie/id/:id' exact component={Detail} />
      <Route path='/movie/discover/:type' exact component={Catalog} />
      <Route path='/home' exact component={Home} />
      <Route path='/' exact component={Login} />
      <Redirect to='/home' />
    </Switch>
  );
};

export default Routes;
