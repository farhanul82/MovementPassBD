import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { fetch_User_MovementPass } from '../redux/action/movementPass';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { logout } from '../redux/action/auth';
import { BiCompass } from 'react-icons/bi';

const UserNavbar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const logout_user = () => {
    dispatch(logout())

  };

  const movement = () => {
    dispatch(fetch_User_MovementPass())
    history.push('/movement')
  }
  return (
    <div>
      <Navbar className="onlyUserNavbar" bg="dark" variant="dark" expand="lg">
        <div className="d-flex justify-content-around ">

          <BiCompass className="passIconUser" />
          <Navbar.Brand href="#home">Pass Code Bd</Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0 nav"
            navbarScroll
          >
            <Nav.Link onClick={() => history.push("/home")}>Home</Nav.Link>
            <Nav.Link onClick={() => movement()}>Movement</Nav.Link>
            <Nav.Link onClick={() => history.push("/profile")}>Profile </Nav.Link>

            {
              isAuthenticated ? (
                <Nav.Link className="nav-link logoutNav" onClick={logout_user} href="#action2">LogOut</Nav.Link>

              ) : (
                <Nav.Link className="loginNav" onClick={() => history.push("/login")}>Login</Nav.Link>

              )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default UserNavbar;





