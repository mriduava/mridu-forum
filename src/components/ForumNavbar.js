import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../contexts/UserContextProvider'
import {Container, Collapse, Navbar, NavbarToggler, Nav, NavItem} from 'reactstrap';

const ForumNavbar= (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { user, setUser} = useContext(UserContext)

  const logoutUser = async () => {
    await fetch('/logout')
    setUser(null)
    localStorage.removeItem('token');
  }

  return (
    <Container className="px-0">
      <Navbar light expand="md" className="bg-warning bg-gradient rounded-bottom shadow mb-2">
        <Link to="/" className="mr-auto navbar-brand text-datk font-weight-bold mb-0 pt-2 pb-0"><h3>MRIDU FORUM</h3></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!user?(
            <>
              <NavItem>
                <Link className="text-dark mr-4" to="/register">REGISTER</Link>
              </NavItem>
              <NavItem>
                <Link className="text-dark" to="/signin">SIGN IN</Link>
              </NavItem>
            </>
            ):(
            <>
              <NavItem>
                <Link className="text-dark mr-4" to="/mypage">MY PAGE</Link>
              </NavItem>
              <NavItem>
                <Link className="text-dark" onClick={logoutUser} to="/"> LOGOUT</Link>
              </NavItem>
            </>
            )}
          </Nav>          
        </Collapse>
      </Navbar>
    </Container>
  );
}

export default ForumNavbar;