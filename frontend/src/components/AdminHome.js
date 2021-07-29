import React from 'react';
import NavBar from './NavBar';
import { logout } from '../redux/action/auth';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { fetch_admin_dashboard, fetch_all_pass, fetch_recent_user } from '../redux/action/AdminDashboard';
import { FaUserFriends, FaWalking } from 'react-icons/fa';
import { AiTwotoneLike } from 'react-icons/ai';
import { RiChatDeleteFill } from 'react-icons/ri';

import { Link, useHistory } from "react-router-dom";



const AdminHome = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const dashBoard = useSelector(state => state.adminDashboard.Dashboard);
    const recentUser = useSelector(state => state.adminDashboard.RecentUser);
    const recentPass = useSelector(state => state.adminDashboard.RecentPass);

    const allMovement=()=>{
        dispatch(fetch_all_pass())
        history.push("/allPass")
    }
    


    
    const allUser=()=>{
        
        history.push("/allUser")
    }


    console.log(recentPass)
    return (
        <div className="container">
            <div className="row DashboardCardDiv">




                {/* <div className="DashboardCardDiv col-md-3 d-flex flex-wrap justify-content-between"> */}
                <div className="DashboardCard col-md-3 ">
                    <div>
                        <h6>Total user</h6>
                        <p>{dashBoard.total_user}</p>
                    </div>
                    <div>
                        <FaUserFriends className="cardIcon" />
                    </div>
                </div>

                <div className="DashboardCard col-md-3 d-flex justify-content-around">
                    <div>
                        <h6>Total Movement Pass</h6>
                        <p>{dashBoard.total_pass}</p>
                    </div>
                    <div>
                        <FaWalking className="TotalPasscardIcon" />
                    </div>
                </div>

                <div className="DashboardCard col-md-3 d-flex justify-content-around">
                    <div>
                        <h6>Total Approved Pass</h6>
                        <p>{dashBoard.total_approved_pass}</p>
                    </div>
                    <div>
                        <AiTwotoneLike className="TotalapprovecardIcon" />
                    </div>
                </div>

                <div className="DashboardCard col-md-3 d-flex justify-content-around">
                    <div>
                        <h6>New Pending Pass</h6>
                        <p>{dashBoard.total_pending_pass}</p>
                    </div>
                    <div>
                        <AiTwotoneLike className="TotalapprovecardIcon" />
                    </div>
                </div>


                <div className="DashboardCard col-md-3 d-flex justify-content-around">
                    <div>
                        <h6>Expired pass</h6>
                        <p>{dashBoard.total_expired_pass}</p>
                    </div>
                    <div>
                        <RiChatDeleteFill className="ExpiredcardIcon" />
                    </div>
                </div>
                {/* </div> */}



            </div>


            <div className="row">
                <div className=" col-md-6 d-flex justify-content-center">
                    <div className="AdminHome_table_responsive">

                    
                    <p>Recent Regestered Users</p>
                    <table>
                        <thead className="movementPassTH">
                            <tr>
                                <th >SL</th>
                                <th className="AdminHomeTH">Joined at</th>
                                <th>Name</th>

                            </tr>
                        </thead>

                        <tbody>
                            {recentUser?.map((item, index) => {
                                return (

                                    <tr>
                                        <td>{index + 1}</td>

                                        <td>{item.created_at}</td>
                                        <td>{item.name}</td>




                                    </tr>



                                )
                            })}
                        </tbody>
                    </table>
                    <button  onClick={()=>allUser()} className="btn allUserButton">View all users</button>
                    </div>
                </div>



                <div className=" col-md-6 d-flex justify-content-center">
                    <div className="RecentPass_table_responsive">

                  
                    <p>Recent Regestered Users</p>
                    <table>
                        <thead>
                            <tr>
                                <th >SL</th>
                                <th >Track Id</th>
                                <th>Status</th>

                            </tr>
                        </thead>

                        <tbody>
                            {recentPass?.map((item, index) => {
                                return (

                                    <tr>
                                        <td>{index + 1}</td>

                                        <td>{item.id}</td>
                                        {item.is_approved ? (
                                            <td>Approved</td>
                                        ) : (
                                            <td>Pending</td>
                                        )}





                                    </tr>



                                )
                            })}
                        </tbody>
                    </table>
                   
                    <button onClick={()=>allMovement()} className="btn allUserButton">View all movement Pass</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminHome;