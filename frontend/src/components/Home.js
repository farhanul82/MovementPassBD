import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from "react-router-dom";
import { logout } from '../redux/action/auth';
import UserNavbar from "./UserNavbar";
import Button from '@material-ui/core/Button';
import { BiRightArrowCircle } from 'react-icons/bi';
import { getUser } from '../redux/action/getUser';
import { fetch_User_Profile } from '../redux/action/Profile';
import NavBar from './NavBar';
import AdminHome from './AdminHome';
import { fetch_admin_dashboard, fetch_recent_pass, fetch_recent_user } from '../redux/action/AdminDashboard';
import { fetch_User_MovementPass } from '../redux/action/movementPass';
import CreateProfiel from './CreateProfiel';


const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetch_User_Profile())
        dispatch(fetch_admin_dashboard())
        dispatch(fetch_recent_user())
        dispatch(fetch_recent_pass())
    }, [dispatch])

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
   
    const profile = useSelector(state => state.profile.userProfile);
  
    console.log(profile)

    let history = useHistory();

    const collectMovement = () => {
        dispatch(fetch_User_MovementPass())
        history.push('/collectMovement')
    }
    return (
        <div>
            {profile[0]?(
                <div>
                     {
                profile.map(i => i.is_admin ? (
                    <div className="">

                        <div>
                            <NavBar />
                        </div>

                        <div className="AdminHomeMainDiv">
                            <AdminHome />

                        </div>
                    </div>
                ) : (
                    <div>
                        <UserNavbar />
                        <div className="container" >
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="home_img_box">
                                        <img src="/images/new-home-bg.png" alt=""></img>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="home_2nd_div">
                                        <div>
                                            <p>
                                                Greetings! Only in case of emergency you can use this tool to get permission from
                                                the concerned police depertment by maintaining the hygiene rules in lockdown.
                                            </p>
                                        </div>
                                        <div>
                                            {isAuthenticated ? (
                                                <div>
                                                    <div className="d-flex justify-content-around">
                                                        <Button onClick={() => history.push("/applyMovement")} variant="contained" color="primary">
                                                            Apply
                                                        </Button>
                                                        <BiRightArrowCircle className="right_icon" />
                                                        <Button onClick={() => collectMovement()} variant="contained" color="primary">
                                                            Collect
                                                        </Button>


                                                    </div>

                                                </div>
                                            ) : (
                                                <Button variant="contained" color="primary">
                                                    Primary
                                                </Button>
                                            )}
                                        </div>
                                        <div className="d-flex justify-content-between">

                                        </div>


                                    </div>

                                </div>
                            </div>



                        </div>
                    </div>
                ))
            }
                </div>
            ):(
                <CreateProfiel/>
            )}
           
        </div>


    );
};

export default Home;