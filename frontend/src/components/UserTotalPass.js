import React from 'react';
import { useSelector } from 'react-redux';
import NavBar from './NavBar';
import Button from '@material-ui/core/Button';
const UserTotalPass = () => {
    const user = useSelector(state => state.adminDashboard.specificUser);
    console.log(user)
    return (
        <div className="">
            <div>
                <NavBar />
            </div>

            <div className="AdminHomeMainDiv">
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
                                <th >Status</th>
                                <th >Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {user[0].movementPass?.map((item, index) => {
                                return (

                                    <tr>
                                        <td>{index + 1}</td>
                                        <td><img src={`http://localhost:8000${item.profile[0].image}`} alt=""></img></td>
                                        <td>{item.from_m}</td>
                                        <td>{item.to_m}</td>
                                        <td>{item.id}</td>
                                        <td>{item.time_spand}</td>

                                        {item.is_expired ? (

                                            <td>  Expired</td>

                                        ) :
                                            (

                                                <td>  active</td>

                                            )}



                                        {item.is_approved ? (

                                            <td>  Approved</td>
                                        ) :
                                            (

                                                <td>Not Approved</td>

                                            )}



                                    </tr>



                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserTotalPass;