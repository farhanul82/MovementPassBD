import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetch_User_single_MovementPass } from '../redux/action/movementPass';
import UserNavbar from './UserNavbar';

const UserMovementPass = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    useEffect(() => {
        dispatch(fetch_User_single_MovementPass(id))
    }, [])

    const pass = useSelector(state => state.MovementPass.userSinglePass)
    console.log(pass)

    return (
        <div>
            <div>
                <UserNavbar />
            </div>
            <div className="container">
                <div className="row">
                    {
                        pass?.map(item => {
                            return (
                                <div>
                                    <div className="d-flex justify-content-around">
                                        <div>
                                            <div className="singlePassUserImg">
                                                <img src={`http://localhost:8000${item.profile[0].image}`} alt=''></img>
                                            </div>

                                            <div>
                                                <p>Name:{item.profile[0].name}</p>
                                            </div>

                                            <div>
                                                <p>Date of Birth:{item.profile[0].birth_date}</p>
                                            </div>

                                            <div>
                                                <p>Mobile No:{item.profile[0].phone}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="singlePassSec1">You Took Movement Pass 1 times</div>
                                            <div className="singlePassSec1">
                                                <p>Reason for the pass</p>
                                                <p className="bedge1">{item.reason}</p>
                                            </div>

                                            <div className="singlePassSec1">
                                                <p>Time allowed for movement</p>
                                                <p className="bedge2">{item.time_spand}</p>
                                            </div>

                                        </div>



                                    </div>


                                    <div className="d-flex justify-content-center">
                                        <div>
                                            <h5>Date and Time</h5>
                                            <h5>{item.date}</h5>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center">

                                        <div>
                                            <h5>{item.from_m}</h5>
                                            <h5>To</h5>
                                            <h5>{item.to_m}</h5>
                                        </div>
                                    </div>


                                    <div className="d-flex justify-content-center">
                                        <div>
                                            <h4>Tracking No</h4>
                                            <h5>{item.id}</h5>
                                        </div>

                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <div className="mb-5">
                                            <img src={`http://localhost:8000${item.qr_image}`} alt=''></img>
                                        </div>

                                    </div>

                                </div>




                            )
                        })
                    }



                </div>
            </div>
        </div>
    );
};

export default UserMovementPass;