import React, { useEffect } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetch_User_Profile } from '../redux/action/Profile';
import UserNavbar from './UserNavbar';

import { FaUserFriends, FaWalking } from 'react-icons/fa';
import { AiTwotoneLike } from 'react-icons/ai';
import { RiChatDeleteFill } from 'react-icons/ri';

const Profile = () => {


    const dispatch = useDispatch()

    const profile = useSelector(state => state.profile.userProfile)
    console.log(profile)

    const total = profile[0].movementPass.length
    const approved = profile[0].movementPass.filter(p => p.is_approved).length
    console.log(approved)
    const expired = profile[0].movementPass.filter(p => p.is_expired).length
    console.log(expired)


    return (
        <div>
            <UserNavbar />

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="profileDiv container-fluid ">
                            <div className='row'>
                                <div className="col-md-4">
                                    <div className="firstDiv  d-flex  justify-content-center">

                                        <div className="firstDivBlock ">
                                            <div className="profileImgBox">
                                                <img className="profileImg" src={`http://localhost:8000${profile[0].image}`} alt=""></img>
                                            </div>
                                            <div className="profileNameDiv">
                                                <h4 className="text-center" >{profile[0].name}</h4>
                                                <h6 className="text-center"  >{profile[0].profession}</h6>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="secondDiv  d-flex  justify-content-center">

                                        <div className="d-flex justify-content-around secondDivBlock">
                                            <div>
                                                <p className="secondDivBlockPPP">country</p>
                                                <p className="secondDivBlockPPP">Distric</p>
                                                <p className="secondDivBlockPPP">Area</p>
                                                <p className="secondDivBlockPPP">Mobile No</p>
                                                <p className="secondDivBlockPPP">Birth Date</p>
                                                <p className="secondDivBlockPPP" className="secondDivBlockPPP">National id</p>
                                            </div>

                                            <div>
                                                <p className="secondDivBlockPPP">:</p>
                                                <p className="secondDivBlockPPP">:</p>
                                                <p className="secondDivBlockPPP">:</p>
                                                <p className="secondDivBlockPPP">:</p>
                                                <p className="secondDivBlockPPP">:</p>
                                                <p className="secondDivBlockPPP">:</p>
                                            </div>

                                            <div>
                                                <p className="secondDivBlockPPP">{profile[0].country}</p>
                                                <p className="secondDivBlockPPP">{profile[0].city}</p>
                                                <p className="secondDivBlockPPP">{profile[0].area}</p>
                                                <p className="secondDivBlockPPP">{profile[0].phone}</p>
                                                <p className="secondDivBlockPPP">{profile[0].birth_date}</p>
                                                <p className="secondDivBlockPPP">{profile[0].Nid}</p>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div className="col-md-4">
                                    {
                                        profile[0].movementPass.length!=0? (
                                            <div className="thirdDiv d-flex  justify-content-end">
                                       

                                        <div className="thirdDivBLock d-flex  justify-content-center ">

                                            <div>
                                                <Link className="userCardLink"  >
                                                    <div className="userCard col-md-3 d-flex justify-content-around">
                                                        <div>
                                                            <h6>Total Movement Pass</h6>
                                                            <p className="number">{total}</p>
                                                        </div>
                                                        <div>
                                                            <FaWalking className="TotalPasscardIcon" />
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link className="userCardLink">
                                                    <div className="userCard col-md-3 d-flex justify-content-around">
                                                        <div>
                                                            <h6>Total Approved Pass</h6>
                                                            <p className="number">{approved}</p>
                                                        </div>
                                                        <div>
                                                            <AiTwotoneLike className="TotalapprovecardIcon" />
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link className="userCardLink" >
                                                    <div className="userCard col-md-3 d-flex justify-content-around">
                                                        <div>
                                                            <h6>Expired pass</h6>
                                                            <p className="number">{expired}</p>
                                                        </div>
                                                        <div>
                                                            <RiChatDeleteFill className="ExpiredcardIcon" />
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>

                                        </div>

                                    </div>
                                        ):(
                                            <div className="userCard2 mt-5 " >
                                                <h4>No Movement Pass Yet</h4>
                                            </div>
                                        )
                                    }
                                    
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;