import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import { edit_profile, fetch_User_Profile } from "../Redux/Action/ProfileAction";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import CSRFToken from "./CSRFToken";

import { Link, Redirect } from 'react-router-dom';
import UserNavbar from './UserNavbar';

const CreateProfiel = () => {
    let history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    // const [formData, setFormData] = useState({
    //     name: "",
    //     profession: "",
    //     country: "",
    //     city:"",
    //     area:'',
    //     blood_group:"",
    //     phone:"",
    //     donation_date:"",
    //   });

    const [name, setName] = useState("");
    const [profession, setProfession] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState('');
    const [area, setArea] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState("");
    const [nId, setNId] = useState("");

    const cities = [
        {
            name: "Dhaka",
            area: [
                "Mohammadpur",
                "Dhanmondi",
                "Mirpur",
                "Firmgate",
                "Mohakhali",
                "Gulshan",
                "Uttara",
                "Motijhil",
            ],
        },
        {
            name: "Chittagong",
            area: [
                "Kotwali",
                "Khulshi",
                "Panchlaish",
                "Pahartali",
                "Halishahar",
                "Anowara",
                "Patiya",
                "Boalkhali",
                "Rangunia",
                "Hathazari",
                "Satkania",
                "Patenga",
            ],
        },
        {
            name: "Sylhet",
            area: ["Ambarkhana", "Subid Bazar", "Tilagor", "Upashahar", "Kazalshah"],
        },
    ];

    const [areas, setAreas] = useState(null);




    const onChange = (e) => {

        setCity(e.target.value)


        setAreas(cities.find(x => x.name === e.target.value).area)

    }

    const [first, setFirst] = useState(true)

    const [profileCreate, setProfileCreate] = useState(false)
    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();


        data.append("name", name);
        data.append("profession", profession);
        data.append("country", country);
        data.append("city", city);
        data.append("area", area);
        data.append("birthDate", birthDate);
        data.append("Nid", nId);
        data.append("phone", phone);
        data.append("image", image);
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
        console.log(data)
        console.log(birthDate)

        axios.post(`http://localhost:8000/api/userProfile/`, data, {
            headers: {
                'content-type': 'multipart/form-data',
                'X-CSRFToken': Cookies.get('csrftoken'),
                Authorization: `Token ${localStorage.getItem("token")}`,
            }
        }).then(res => {
            console.log(res.data)
            setProfileCreate(true)
                ;
        })
    };

    if (profileCreate === true) {
        return <Redirect to="/profile" />
    }



    return (
        <div className="">
            <UserNavbar />
            <div className="container-fluid login">
                <div className="row">
                    <h5 className="mt-3 createProfileHeading">Create Your Profile</h5>
                </div>
                <div className="row">
                    <div className="col-md-6 d-flex justify-content-center">

                        <div className=' d-flex justify-content-center createProfileImg'>

                            <img src='/images/profile.png' alt=''></img>
                        </div>
                    </div>

                    <div className="col-md-6 d-flex justify-content-center">
                        <div className="contact-section">

                            <form onSubmit={(e) => onSubmit(e)} class="wow fadeInRight">

                                {
                                    first ? (
                                        <div>
                                            <div class="form-group">
                                                <input type="text" class="form-control"
                                                    id="formGroupExampleInput" placeholder="Name*"
                                                    name="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required />
                                            </div>


                                            <div class="form-group">
                                                <input type="text" class="form-control"
                                                    id="formGroupExampleInput2" placeholder="Profession"
                                                    name="profession"
                                                    value={profession}
                                                    onChange={(e) => setProfession(e.target.value)}
                                                    required />
                                            </div>

                                            <div class="form-group">
                                                <input class="form-control"
                                                    id="formGroupExampleInput2" type="tel"
                                                    placeholder="phone"
                                                    name="phone"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required />
                                            </div>


                                            <div class="form-group">
                                                <input type="text" class="form-control"
                                                    id="formGroupExampleInput2" placeholder="country"
                                                    name="country"
                                                    value={country}
                                                    onChange={(e) => setCountry(e.target.value)}
                                                    required />
                                            </div>




                                            <div class="form-group mt-2">
                                                <button onClick={() => setFirst(false)} class="btn btn-info hvr-shutter-in-horizontal">Send
                                                    Next</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="form-group">
                                                <select

                                                    value={city}
                                                    onChange={(e) => onChange(e)}
                                                    class="form-control"
                                                    id="exampleFormControlSelect1"
                                                >
                                                    <option>Select City</option>
                                                    {cities.map((x) => {
                                                        return <option>{x.name}</option>;
                                                    })}
                                                </select>

                                            </div>

                                            <div className="form-group">
                                                <select value={area} onChange={(e) => setArea(e.target.value)} class="form-control" id="exampleFormControlSelect1">

                                                    <option>--Area--</option>
                                                    {areas ?
                                                        (areas.map(x => {
                                                            return <option>{x}</option>
                                                        })
                                                        ) :
                                                        (<option>Select Area</option>)
                                                    }

                                                </select>

                                            </div>


                                            <div class="form-group">
                                                <input class="form-control"
                                                    id="formGroupExampleInput2" type="date"
                                                    placeholder="birthDate"
                                                    name="birthDate"
                                                    value={birthDate}
                                                    onChange={(e) => setBirthDate(e.target.value)}
                                                    required />
                                            </div>


                                            <div class="form-group">
                                                <input class="form-control"
                                                    id="formGroupExampleInput2"
                                                    type="text"
                                                    placeholder="Nid no*"
                                                    name="name"
                                                    value={nId}
                                                    onChange={(e) => setNId(e.target.value)}
                                                    required />
                                            </div>


                                            <div className="form-group mt-3">
                                                <input
                                                    type="file"
                                                    id="image"
                                                    accept="image/png, image/jpeg"

                                                    onChange={(e) => setImage(e.target.files[0])}

                                                />
                                            </div>

                                            <div className='d-flex justify-content-around mt-2'>
                                                <button onClick={() => setFirst(true)} class="btn btn-info hvr-shutter-in-horizontal">
                                                    Previous</button>

                                                <button className="btn " type="submit">
                                                    Register
                                                </button>
                                            </div>



                                        </div>
                                    )
                                }

                            </form>
                        </div>
                    </div>
                </div>

                {/* <div className="d-flex justify-content-center">
                <form onSubmit={(e) => onSubmit(e)} className="editProfileForm">
                    <CSRFToken />
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input
                                        className="form-control loginInput"
                                        type="text"
                                        placeholder="Name*"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control loginInput"
                                        type="text"
                                        placeholder="Profession"
                                        name="profession"
                                        value={profession}
                                        onChange={(e) => setProfession(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control loginInput"
                                        type="text"
                                        placeholder="country"
                                        name="country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <select

                                        value={city}
                                        onChange={(e) => onChange(e)}
                                        class="form-control"
                                        id="exampleFormControlSelect1"
                                    >
               
                                        {cities.map((x) => {
                                            return <option>{x.name}</option>;
                                        })}
                                    </select>

                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <select value={area} onChange={(e) => setArea(e.target.value)} class="form-control" id="exampleFormControlSelect1">

                                        <option>--Area--</option>
                                        {areas ?
                                            (areas.map(x => {
                                                return <option>{x}</option>
                                            })
                                            ) :
                                            (<option>select city</option>)
                                        }

                                    </select>
                                 
                                </div>

                                <div className="form-group">
                                    <input
                                        className="form-control loginInput"
                                        type="date"
                                        placeholder="blood_group"
                                        name="blood_group"
                                        value={birthDate}
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        className="form-control loginInput"
                                        type="text"
                                        placeholder="N id no*"
                                        name="name"
                                        value={nId}
                                        onChange={(e) => setNId(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control loginInput"
                                        type="tel"
                                        placeholder="phone"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="file"
                                        id="image"
                                        accept="image/png, image/jpeg"

                                        onChange={(e) => setImage(e.target.files[0])}

                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                    <button className="btn editProfileBtn" type="submit">
                        Register
                    </button>
                </form>
            </div> */}
            </div>
        </div>
    );
};

export default CreateProfiel;
