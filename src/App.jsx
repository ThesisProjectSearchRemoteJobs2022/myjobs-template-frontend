import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

import { actionType } from "./reducer/reducer";
import { useStateValue } from "./reducer/StateProvider";

function App() {
  const [{cities, itinerarie}, dispatch]=useStateValue()
  return (
    <BrowserRouter>
    <div className="pt-0">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
      </Switch>
    </div>
    </BrowserRouter>
  )
}
// https://tailwindui.com/preview#component-55b9c2097342175b8ddfccf8a30fb68f
export default App
