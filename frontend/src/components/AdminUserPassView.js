import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetch_User_single_MovementPass } from '../redux/action/movementPass';
import Button from '@material-ui/core/Button';
import NavBar from './NavBar';
import axios from 'axios';
import CSRFToken from "./CSRFToken";
import Cookies from "js-cookie";

const AdminUserPassView = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    useEffect(() => {
        dispatch(fetch_User_single_MovementPass(id))
    }, [])

    const pass = useSelector(state => state.MovementPass.userSinglePass)
    console.log(pass)


    const disApproveUserPass = async (id) => {
        await axios({
            method: "POST",
            url: 'http://localhost:8000/api/disApproveUerPass/',
            data: { "id": id },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
                Authorization: `Token ${localStorage.getItem("token")}`,
            },

        }).then(res =>

            dispatch(fetch_User_single_MovementPass(id))
        )

    }


    const approveUserPass = async (id) => {
        await axios({
            method: "POST",
            url: 'http://localhost:8000/api/approveUerPass/',
            data: { "id": id },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
                Authorization: `Token ${localStorage.getItem("token")}`,
            },

        }).then(res =>
            dispatch(fetch_User_single_MovementPass(id))
        )

    }


    const expireUserPass = async (id) => {
        await axios({
            method: "POST",
            url: 'http://localhost:8000/api/expireUerPass/',
            data: { "id": id },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
                Authorization: `Token ${localStorage.getItem("token")}`,
            },

        }).then(res =>
            dispatch(fetch_User_single_MovementPass(id))
        )

    }


    const unExpireUserPass = async (id) => {
        await axios({
            method: "POST",
            url: 'http://localhost:8000/api/unExpireUerPass/',
            data: { "id": id },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
                Authorization: `Token ${localStorage.getItem("token")}`,
            },

        }).then(res =>
            dispatch(fetch_User_single_MovementPass(id))
        )

    }



    return (
        <div className="">

            <div>
                <NavBar />
            </div>
            <div className="AdminHomeMainDiv ">
                <div className="container">
                    <div className="row infoDiv mb-5">

                        <div className="col-md-6 d-flex justify-content-center  mt-4 ">
                            {
                                pass.map(item => {
                                    return (
                                        <div className="AdminuserInfoDiv">
                                            {/* <div className="dashboardUserImgBox">
                                                <img src={`http://localhost:8000${item.profile[0].image}`} alt=""></img>
                                            </div> */}
                                            <h5>User Information</h5>
                                            <hr></hr>
                                            
                                            <ul className="useInfoList">
                                                <li className=""><span >Name</span> <span className="colon1">:{item.profile[0].name}</span></li>
                                                <li> <span>Profession</span> <span className="colon2">:{item.profile[0].profession}</span></li>
                                                <li> <span>DOB</span> <span className="colon3">:{item.profile[0].birth_date}</span></li>
                                                <li><span>Mobile</span> No <span className="colon4">:{item.profile[0].phone}</span></li>
                                                <li><span>District</span> <span className="colon5">:{item.profile[0].city}</span></li>
                                                <li><span>Area</span> <span className="colon6">:{item.profile[0].area}</span></li>
                                                <li><span>Nid</span> <span className="colon7">:{item.profile[0].Nid}</span></li>


                                            </ul>



                                        </div>
                                    )
                                })
                            }
                        </div>

<hr></hr>
                        <div className=" col-md-6 d-flex justify-content-center  mt-4">

                            {
                                pass.map(item => {
                                    return (
                                        <div className="adminMovePassInfo ">
                                            <CSRFToken />
                                            <h5>Movement Pass Information</h5>
                                            <hr></hr>
                                            <ul className="passInfoList">
                                                <li className=""><span >Tracking Id</span> <span className="colon1">:</span><span className="part1">{item.id}</span></li>
                                                <li> <span>Pass Reason</span> <span className="colon2">:</span><span className="part2">{item.reason}</span></li>
                                                <li> <span>From</span> <span className="colon3">:{item.from_m}</span></li>
                                                <li><span>To</span> No <span className="colon4">:{item.to_m}</span></li>
                                                <li><span>Time From</span> <span className="colon5">:{item.date}</span></li>
                                                <li><span>Time Spend</span> <span className="colon6">:{item.time_spand}</span></li>

                                            </ul>
                                            {/* <div className="d-flex justify-content-around"> */}
                                            <ul className="buttonList d-flex flex-wrap justify-content-around">

                                                {
                                                    item.is_approved ? (

                                                        <li><button onClick={() => disApproveUserPass(item.id)} className="passBtn1 btn"   > Disapprove</button></li>
                                                    ) : (
                                                        <li> <button onClick={() => approveUserPass(item.id)} className="passBtn1 btn"   > Approve</button></li>
                                                    )
                                                }


                                                {
                                                    item.is_expired ? (
                                                        <li> <button className="passBtn2 btn" onClick={() => unExpireUserPass(item.id)} > Unexpire</button></li>
                                                    ) : (
                                                        <li> <button onClick={() => expireUserPass(item.id)} className="passBtn2 btn" > Expire</button></li>
                                                    )
                                                }

                                                <li> <button className="passBtn3 btn" > Delete</button></li>
                                            </ul>


                                        </div>


                                    )
                                })
                            }
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default AdminUserPassView;