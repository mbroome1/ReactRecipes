import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <h1 className="">Home</h1>
            <p className="h4 text-secondary">Work in progress:</p>
            <p className="lead">- Pages</p>
            <ul>
              <li><a href="/recipes" className="link-primary">recipes search page</a></li>
              <li><a href="/recipes/654959" className="link-primary">get recipe by id page (e.g. 654959)</a></li>
            </ul>
            <p className='lead'>- CSS styling to be customised later. (Using Bootstrap default styling for prototyping.)</p>
        </div>
    );
  }
}
