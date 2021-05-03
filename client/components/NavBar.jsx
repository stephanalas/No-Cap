/* eslint jsx-quotes: "off" */

import React from 'react';
import { connect } from 'react-redux';
import { Navbar as BootstrapNavBar, Nav, Container } from 'react-bootstrap';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HamburgerMenu from 'react-hamburger-menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/NavBar.css';

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  }

  render() {
    return (
      <>
        <BootstrapNavBar
          collapseOnSelect
          expand='lg'
          bg='light'
          variant='light'
          className='sticky-nav'
        >
          <Container fluid>
            {/* <BootstrapNavBar.Toggle aria-controls='responsive-navbar-nav'> */}
            <button
              aria-controls='responsive-navbar-nav'
              type='button'
              aria-label='Toggle navigation'
              className={`navbar-toggler ${this.state.open ? 'collapsed' : ''}`}
            >
              <HamburgerMenu
                isOpen={this.state.open}
                menuClicked={this.handleClick}
                width={18}
                height={15}
                strokeWidth={1}
                rotate={0}
                color='black'
                borderRadius={0}
                animationDuration={0.5}
              />
            </button>
            {/* </BootstrapNavBar.Toggle> */}
            {/* <BootstrapNavBar.Collapse id='responsive-navbar-nav'> */}
            <div
              id='responsive-navbar-nav'
              className={`navbar-collapse collapse ${
                this.state.open ? 'show' : ''
              }`}
            >
              <Nav className='m-auto' id='nav'>
                <BootstrapNavBar.Brand href='#/'>
                  <img
                    className='d-inline-block align-top'
                    id='logo'
                    // src='https://cdn.shopify.com/s/files/1/0085/4333/8543/products/NoCap.png?v=1584644511'
                    src='logo.svg'
                    alt='NoCap Logo'
                  />
                </BootstrapNavBar.Brand>

                <Nav.Link className='nav-link underline' href='#Products'>
                  Products
                </Nav.Link>
                <Nav.Link className='nav-link underline' href='#Contact'>
                  Contact Us
                </Nav.Link>
                {this.props.user.role &&
                this.props.user.role !== 'Anonymous' ? (
                  <Nav.Link className='nav-link underline' href='#Logout'>
                    Logout
                  </Nav.Link>
                ) : (
                  <Nav.Link className='nav-link underline' href='#Login'>
                    Log In
                  </Nav.Link>
                )}
                {this.props.user.role &&
                this.props.user.role === 'Anonymous' ? (
                  <Nav.Link className='nav-link underline' href='#register'>
                    Register
                  </Nav.Link>
                ) : null}
                {this.props.user.role && this.props.user.role === 'Admin' ? (
                  <Nav.Link className='nav-link underline' href='#admin'>
                    Admin
                  </Nav.Link>
                ) : null}
                <Nav.Link className='nav-link underline' href='#ShoppingCart'>
                  <ShoppingCartIcon />
                </Nav.Link>
              </Nav>
              {/* </BootstrapNavBar.Collapse> */}
            </div>
          </Container>
        </BootstrapNavBar>
      </>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(NavBar);
// export default NavBar;
