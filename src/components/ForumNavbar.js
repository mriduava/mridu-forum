import React, { useState, useContext,useEffect } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../contexts/UserContextProvider'
import {Container, Collapse, Navbar, NavbarToggler, Nav, NavItem} from 'reactstrap';

const ForumNavbar= (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { user, setUser} = useContext(UserContext);

  /**
   * Sticky Navabr
   */
  const [scrolled, setScrolled]= useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    offset > 200 ?setScrolled(true):setScrolled(false); 
  }

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
  }, [])

  useEffect(() => {
    if (scrolled) {
      document.getElementById("sticky").classList.add("sticky-top");
    }else{
      document.getElementById("sticky").classList.remove("sticky-top");
    }
  }, [scrolled])
 
  /**
  * Function to logout users.
  */
  const logoutUser = async () => {
    await fetch('/logout')
    setUser(null)
    localStorage.removeItem('token');
  }

  return (
    <div className="navbar px-0 py-0" id="sticky">
      <Container className="px-lg-0">
        <Navbar light expand="md" className="px-0">
          <Link to="/" className="navbar-brand text-datk font-weight-bold"><h3>MRIDU FORUM</h3></Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto mt-2 right-nav" navbar>
              <NavItem>
                <Link to="/about">
                  <h5 className="text-dark mr-lg-4">ABOUT</h5>
                </Link>
              </NavItem>
              {!user?(
              <>
                <NavItem>
                  <Link to="/register">
                    <h5 className="text-dark mr-lg-4">REGISTER</h5>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/signin">
                    <h5 className="text-dark">SIGN IN</h5>
                  </Link>
                </NavItem>
              </>
              ):(
              <>
                <NavItem>
                  <Link to="/mypage">
                    <h5 className="text-dark mr-lg-4">MY PAGE</h5>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link onClick={logoutUser} to="/"> 
                    <h5 className="text-dark">LOGOUT</h5>
                  </Link>
                </NavItem>
              </>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

export default ForumNavbar;