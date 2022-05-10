import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Footer from './Footer';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className='d-flex flex-column min-vh-100'>
        <NavMenu />
        <Container className="flex-grow-1">
          {this.props.children}
          </Container>
          <Footer />
      </div>
    );
  }
}
