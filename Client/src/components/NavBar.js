import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import "./NavBar.css"
import { getLocalStorageUser } from '../UTILS/localStorageUtils';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [showBasic, setShowBasic] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = getLocalStorageUser();
    if (storedUser !== null) {
      setIsUserLoggedIn(true);
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    localStorage.clear();
    //setIsNavCollapsed(true);
  };

  return (
    <MDBNavbar expand='lg'  style={{backgroundColor: "#f0f8ff"}} >
      <MDBContainer fluid>
        <MDBNavbarBrand href='/home'>TypeMaster</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/home'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/about' >About</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  Ways To Play
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link><Link to="/Practice">Practice</Link></MDBDropdownItem>
                  <MDBDropdownItem link><Link to="/JoinGame">Multiplayer</Link></MDBDropdownItem>
                  <MDBDropdownItem link>Something else</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>
                Disabled
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <div className='div3'>
            {isUserLoggedIn ? (
              
              <span className='horiz-layout'>
                <MDBBtn href='/User'>
                <i class="far fa-user"></i>
                </MDBBtn>
                <span className='marg'>{user.username}</span>
              </span>
            ) : (
              <MDBBtn href='/Login' rounded>
                Signin
              </MDBBtn>
            )}
          </div>
          <div>
            {isUserLoggedIn ? (
              <MDBBtn href='/home' rounded className='mx-2' color='danger' onClick={handleLogout}>
                Logout
              </MDBBtn>
            ) : (
              <MDBBtn href='/SignUp' rounded className='mx-2' color='secondary'>
                Signup
              </MDBBtn>
            )}
          </div>

        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

