import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <h1 className="display-2">Home</h1>
            <p className="lead">Work in progress pages:</p>
            <ul>
              <li><a href="/recipes" className="link-primary">recipes search page</a></li>
              <li><a href="/recipes/654959" className="link-primary">get recipe by id page (e.g. 654959)</a></li>
            </ul>
              

            
        </div>
    );
  }
}
