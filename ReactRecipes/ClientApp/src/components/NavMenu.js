import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, NavLink as NavLinkFromDom} from 'react-router-dom'; //Passing NavLink here to reactstrap's NavLink to enable 'active' link property
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar navbar-light navbar-expand-sm navbar-toggleable-sm box-shadow mb-3" light>
        {/* <Navbar className="navbar navbar-dark navbar-expand-sm navbar-toggleable-sm mb-3 bg-dark" dark> */}
        {/* <Navbar className="navbar navbar-dark navbar-expand-sm navbar-toggleable-sm mb-3 bg-dark box-shadow" dark> */}
        {/* <Navbar className="navbar navbar-light navbar-expand-sm navbar-toggleable-sm mb-3" light> */}
          <Container>
            <NavbarBrand tag={Link} to="/" className='fw-bold'>React Recipes</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink exact activeClassName="active" tag={NavLinkFromDom} className="nav-link" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink activeClassName="active" tag={NavLinkFromDom} className="nav-link" to="/recipes">Recipes</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
