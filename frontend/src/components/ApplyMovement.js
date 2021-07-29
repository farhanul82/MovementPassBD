import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import { edit_profile, fetch_User_Profile } from "../Redux/Action/ProfileAction";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import CSRFToken from "./CSRFToken";
import UserNavbar from "./UserNavbar";

const ApplyMovement = () => {
    let history = useHistory();


    const [location, setLocation] = useState("");
    const [district, setdistrict] = useState("");
    const [toGO, setToGO] = useState("");
    const [reason, setReason] = useState('');

    const [date, setDate] = useState("");

    const [timeSpend, setTimeSpend] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();


        data.append("location", location);
        data.append("district", district);
        data.append("toGO", toGO);
        data.append("reason", reason);
        data.append("date", date);

        data.append("timeSpend", timeSpend);
        // const data = {
        //     "name": name,
        //     "profession": profession,
        //     "country": country,
        //     "city":city,
        //     "area": area,
        //     "birthDate": birthDate,
        //     "phone": phone,
        //     "image": image.File
        // }


        axios.post(`http://localhost:8000/api/applyForPass/`, data, {
            headers: {
                'content-type': 'multipart/form-data',
                'X-CSRFToken': Cookies.get('csrftoken'),
                Authorization: `Token ${localStorage.getItem("token")}`,
            }
        }).then(res => console.log(res.data))
    };

    return (
        <div>
            <UserNavbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="home_img_box">
                            <img src="/images/new-home-bg.png" alt=""></img>
                        </div>
                    </div>

                    <div className="col-md-6 d-flex justify-content-center">
                        <form onSubmit={(e) => onSubmit(e)} className="editProfileForm">
                            <CSRFToken />

                            <h5>Apply For Pass</h5>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">

                                        <div className="form-group">
                                            <input
                                                className="form-control loginInput"
                                                type="text"
                                                placeholder="district"
                                                name="district"
                                                value={district}
                                                onChange={(e) => setdistrict(e.target.value)}
                                                required
                                            />
                                        </div>


                                        <div className="form-group">
                                            <input
                                                className="form-control loginInput"
                                                type="text"
                                                placeholder="Enter your location"
                                                name="location"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                required
                                            />
                                        </div>


                                        <div className="form-group">
                                            <input
                                                className="form-control loginInput"
                                                type="text"
                                                placeholder="Where to go"
                                                name="toGO"
                                                value={toGO}
                                                onChange={(e) => setToGO(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control loginInput"
                                                type="text"
                                                placeholder="reason"
                                                name="reason"
                                                value={reason}
                                                onChange={(e) => setReason(e.target.value)}
                                                required
                                            />
                                        </div>


                                        <div className="form-group">
                                            <input
                                                className="form-control loginInput"
                                                type="datetime-local"

                                                name="date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control loginInput"
                                                type="text"
                                                placeholder="Set a time to stay out"
                                                name="phone"
                                                value={timeSpend}
                                                onChange={(e) => setTimeSpend(e.target.value)}
                                                required
                                            />
                                        </div>


                                    </div>
                                </div>
                            </div>

                            <button className="btn editProfileBtn" type="submit">
                                Register
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ApplyMovement;


