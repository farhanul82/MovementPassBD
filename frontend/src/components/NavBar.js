import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, Redirect, useHistory } from "react-router-dom";
import { BiCompass } from 'react-icons/bi';
import { AiFillDashboard } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { GiMovementSensor } from 'react-icons/gi';
import { BiLogInCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_all_aprroved_pass, fetch_all_expired_pass, fetch_all_pass, fetch_all_pending_pass, fetch_recent_user } from '../redux/action/AdminDashboard';
import { logout } from '../redux/action/auth';
import { Button, Nav, Navbar, NavDropdown, NavbarBrand } from 'react-bootstrap';


const NavBar = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)


    const [loggedout, setLoggedout] = useState(false)

    const allPass = () => {
        dispatch(fetch_all_pass())
        history.push("/allPass")
    }


    const allApprovedPass = () => {
        dispatch(fetch_all_aprroved_pass())
        history.push("/allApprovedPass")
    }

    const allPendingPass = () => {
        dispatch(fetch_all_pending_pass())
        history.push("/allPendingPass")
    }


    const allExpiredPass = () => {
        dispatch(fetch_all_expired_pass())
        history.push("/allExpiredPass")
    }

    const Log = () => {
        dispatch(logout())
        history.push('/login')
    }

    const logout_user = () => {
        dispatch(logout())
        history.push('/login')
    };




    return (
        <div>
            <div className="adminNavbar1Div">
                <ProSidebar className="proSidebar adminNavbar1">
                    <div className="d-flex justify-content-around ">
                        <BiCompass className="passIcon" />
                        <h5 className="brandname">Pass Code Bd</h5>
                    </div>
                    <hr></hr>
                    <Menu iconShape="square">

                        <MenuItem ><Link to="/home"> <AiFillDashboard /><span className="navText">Dashboard</span></Link>  </MenuItem>


                        <SubMenu title="Movement Pass" >
                            <MenuItem> <Link onClick={() => allPass()} >All Pass</Link></MenuItem>
                            <MenuItem><Link onClick={() => allApprovedPass()} >Approved Pass</Link></MenuItem>
                            <MenuItem><Link onClick={() => allPendingPass()} >Pending Pass</Link></MenuItem>
                            <MenuItem><Link onClick={() => allExpiredPass()} >Expired Pass</Link></MenuItem>
                        </SubMenu>
                        <MenuItem> <Link to="/allUser"></Link> <FiUsers /><span className="navText">All Users</span> </MenuItem>
                        <MenuItem> <Link to="/login"></Link> <FiUsers /><span className="navText">login</span> </MenuItem>
                        <hr></hr>

                        <MenuItem> <Link onClick={() => Log()}><BiLogInCircle /> <span className="navText"> Logout</span> </Link></MenuItem>


                    </Menu>
                </ProSidebar>
            </div>
            <div className="adminNavbar2Div">
                <Navbar bg="dark" variant="dark" expand="lg" className="adminNavbar2">
                    <div className="d-flex justify-content-around ">

                        <BiCompass className="passIconUser" />
                        <Navbar.Brand className="brandname" href="#home">Pass Code Bd</Navbar.Brand>
                    </div>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="mr-auto my-2 my-lg-0 nav"
                            navbarScroll
                        >
                            <Nav.Link onClick={() => history.push("/")}><AiFillDashboard /><span className="navText">Dashboard</span></Nav.Link>
                            <Nav.Link onClick={() => history.push("/allUser")} > <FiUsers /><span className="navText">All Users</span></Nav.Link>
                            <NavDropdown className="dropdown" title="Movement Pass" id="navbarScrollingDropdown" >
                                <NavDropdown.Item onClick={() => allPass()} >All Pass</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => allApprovedPass()} >Approved Pass</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => allPendingPass()} >Pending Pass</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => allExpiredPass()} >Expired Pass</NavDropdown.Item>
                            </NavDropdown>

                            {
                                isAuthenticated ? (
                                    <Nav.Link className="nav-link" onClick={logout_user} href="#action2">LogOut</Nav.Link>

                                ) : (
                                    <Nav.Link onClick={() => history.push("/login")}>Log in</Nav.Link>

                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>



        </div>
    );
};

export default NavBar;


