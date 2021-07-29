import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from "react-router-dom";

import NavBar from './NavBar';
import { FaUserFriends, FaWalking } from 'react-icons/fa';
import { AiTwotoneLike } from 'react-icons/ai';
import { RiChatDeleteFill } from 'react-icons/ri';
import { fetch_User_single_MovementPass } from '../redux/action/movementPass';
import { Badge } from 'react-bootstrap';

const AdminFetchUser = () => {
    const { name } = useParams();
    const history = useHistory()
    const dispatch = useDispatch()


    const userTotalPass = (id) => {

        history.push("/userTotalPass")

    }

    const userApprovedPass = (id) => {

        history.push("/userApprovedPass")

    }
    const MovePass = ({ user }) => {
        const approved = user.movementPass.filter(p => p.is_approved).length
        console.log(approved)
        const expired = user.movementPass.filter(p => p.is_expired).length
        console.log(expired)
        return (
            <div>
                <Link className="userCardLink" onClick={() => userTotalPass(user.id)} >
                    <div className="userCard d-flex justify-content-around">
                        <div>
                            <h6>Total Movement Pass</h6>
                            <p className="number">{approved}</p>
                        </div>
                        <div>
                            <FaWalking className="TotalPasscardIcon" />
                        </div>
                    </div>
                </Link>
                <Link className="userCardLink" onClick={() => userApprovedPass(user.id)}>
                    <div className="userCard  d-flex justify-content-around">
                        <div>
                            <h6>Total Approved Pass</h6>
                            <p className="number">{approved}</p>
                        </div>
                        <div>
                            <AiTwotoneLike className="TotalapprovecardIcon" />
                        </div>
                    </div>
                </Link>
                <Link className="userCardLink" to="/userExpiredPass">
                    <div className="userCard  d-flex justify-content-around">
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
        )
    }

    const user = useSelector(state => state.adminDashboard.specificUser);
    console.log(user)
    return (
        <div className="">
            <div>
                <NavBar />
            </div>

            <div className="AdminHomeMainDiv">

                {user.map(user => (
                    <div className="d-flex flex-wrap justify-content-around userDiv">
                        <div className="userDiv1 d-flex  justify-content-center">
                            <div>
                                <div className="userImageBox">
                                    <img src={`http://localhost:8000${user.image}`} alt=""></img>
                                </div>

                                <h4>{user.name}</h4>
                                <h6>{user.profession}</h6>
                            </div>

                        </div>

                        <div className="userDiv2">
                            <p><span clasName="">District</span>:<span>{user.city}</span></p>
                            <p><span>City</span>:<span>{user.area}</span></p>
                            <p><span>Birth Date</span>:<span>{user.birth_date}</span></p>
                            <p><span>Phone</span>:<span>{user.phone}</span></p>
                            <p><span>Nid No</span>:<span>{user.Nid}</span></p>
                        </div>

                        <div className="userDiv3">
                            <MovePass user={user} />

                        </div>
                    </div>
                ))}




            </div>
        </div>
    );
};

export default AdminFetchUser;