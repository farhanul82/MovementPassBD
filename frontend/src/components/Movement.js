import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from "react-router-dom";
import UserNavbar from './UserNavbar';
import { fetch_User_MovementPass } from '../redux/action/movementPass';
import Button from '@material-ui/core/Button';
import Shake from 'react-reveal/Shake';
import Slide from 'react-reveal/Slide';

const Movement = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const pass = useSelector(state => state.MovementPass.userPass)
    console.log(pass)
    return (
        <div>
            <div>
                <UserNavbar />
            </div>
          


            <div className='container'>
                <div className='row'>
                    <div className="col-md-12 d-flex justify-content-center">
                        {
                            pass[0] ? (
                                <div class="table_responsive ">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th >SL</th>
                                                <th>Image</th>
                                                <th>Location From</th>
                                                <th>Where to go</th>
                                                <th >Tracking No.</th>

                                                <th>Time</th>
                                                <th >Status</th>
                                                <th >Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {pass?.map((item, index) => {
                                                return (

                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td><img src={`http://localhost:8000${item.profile[0].image}`} alt=""></img></td>
                                                        <td>{item.from_m}</td>
                                                        <td>{item.to_m}</td>
                                                        <td>{item.id}</td>
                                                        <td>{item.time_spand}</td>
                                                        <td>
                                                            {item.is_expired ? (
                                                                <Button className="materialBtn" variant="contained" color="primary">
                                                                    Expired
                                                                </Button>) :
                                                                (
                                                                    <Button className="materialBtn" variant="contained" color="primary">
                                                                        active
                                                                    </Button>
                                                                )}
                                                        </td>

                                                        <td>
                                                            {item.is_approved ? (
                                                                <Button className="materialBtn" onClick={() => history.push(`/userMovementPass/${item.id}`)} variant="contained" color="secondary">
                                                                    View
                                                                </Button>) :
                                                                (
                                                                    <Button className="materialBtn" variant="contained" color="secondary">
                                                                        Not Approved
                                                                    </Button>
                                                                )}
                                                        </td>


                                                    </tr>



                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div>
                                    <Slide top>
                                    <div className="noPassDiv">
                                        <h4>Sorry..! No Movement Pass Yet</h4>
                                    </div>
                                    </Slide>
                                    <Shake>
                                        <Button className="mt-3" onClick={() => history.push("/applyMovement")} variant="contained" color="primary">
                                            Apply
                                        </Button>
                                    </Shake>
                                </div>
                            )
                        }


                    </div>
                </div>
            </div>


        </div>
    );
};

export default Movement;