import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from './NavBar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CSRFToken from "./CSRFToken";
import Cookies from "js-cookie";
import { fetch_User_single_MovementPass } from '../redux/action/movementPass';
import { fetch_specific_user } from '../redux/action/AdminDashboard';

const UserApprovedPass = () => {
    const dispatch = useDispatch()
    const [approve, setApprove] = useState(false)
    const [disapprove, setDisapprove] = useState(false)
    const user = useSelector(state => state.adminDashboard.specificUser);
    console.log(user[0].movementPass?.filter(x => x.is_expired === true).length)

    useEffect(() => {
      setApprove(true)
    }, [])

    const Approve=()=>{
        setDisapprove(false)
        setApprove(true)
    }

    const Disapprove= ()=>{
        setDisapprove(true)
        setApprove(false)
    }


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

            dispatch(fetch_specific_user(user[0].id))
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
            dispatch(fetch_specific_user(user[0].id))
        )

    }



    return (
        <div className="">
            <div>
                <NavBar />
            </div>

            <div className="AdminHomeMainDiv">
                <div className="d-flex justify-content-around approveBtnList">
                <Button onClick={()=>Approve()} variant="contained" color="primary">
                    Approved
                </Button>

                <Button onClick={()=>Disapprove()} variant="contained" color="secondary">
                    Disapproved
                </Button>


                </div>
                <CSRFToken />
                {
                    approve ? (
                        <div class="user_all_table_responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th >SL</th>
                                        <th>Image</th>
                                        <th>Location From</th>
                                        <th>Where to go</th>
                                        <th >Tracking No.</th>

                                        <th>Time</th>
                                       
                                        <th >Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {user[0].movementPass?.filter(x => x.is_approved === true).map((item, index) => {
                                        return (

                                            <tr>
                                                <td>{index + 1}</td>
                                                <td><img src={`http://localhost:8000${item.profile[0].image}`} alt=""></img></td>
                                                <td>{item.from_m}</td>
                                                <td>{item.to_m}</td>
                                                <td>{item.id}</td>
                                                <td>{item.time_spand}</td>
                                                <td>  <button onClick={() => disApproveUserPass(item.id)} className="passBtn1 btn"   > Disapprove</button></td>
                                               
                                            </tr>



                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div></div>
                    )
                }



{
                    disapprove ? (
                        <div class="user_all_table_responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th >SL</th>
                                        <th>Image</th>
                                        <th>Location From</th>
                                        <th>Where to go</th>
                                        <th >Tracking No.</th>

                                        <th>Time</th>
                                
                                        <th >Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {user[0].movementPass?.filter(x => x.is_approved === false).map((item, index) => {
                                        return (

                                            <tr>
                                                <td>{index + 1}</td>
                                                <td><img src={`http://localhost:8000${item.profile[0].image}`} alt=""></img></td>
                                                <td>{item.from_m}</td>
                                                <td>{item.to_m}</td>
                                                <td>{item.id}</td>
                                                <td>{item.time_spand}</td>

                                               



                                                    <td>  <button onClick={() => approveUserPass(item.id)} className="passBtn1 btn"   > Approve</button></td>
                                               
                                                



                                            </tr>



                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div></div>
                    )
                }



            </div>
        </div>
    );
};


export default UserApprovedPass;