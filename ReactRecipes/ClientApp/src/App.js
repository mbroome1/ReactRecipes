import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';


import './custom.css'
import { Recipes } from './components/Recipes';
import Recipe from './components/Recipe';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/recipes' component={Recipes} />
        <Route exact path='/recipes/:id' component={Recipe} />
      </Layout>
    );
  }
}
