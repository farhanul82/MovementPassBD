import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import PaginationComponent from './Pagination';
import Search from './Search';

import { Link, useHistory } from "react-router-dom";

import { GrView } from 'react-icons/gr';
import { fetch_all_users, fetch_specific_user, fetch_specific_user_pass } from '../redux/action/AdminDashboard';

const AllUser = () => {
    useEffect(() => {
        dispatch(fetch_all_users())
    }, [])
    const dispatch = useDispatch()
    const Allusers = useSelector(state => state.adminDashboard.Allusers);
    console.log(Allusers)
    let history = useHistory();


    const [pass, setPass] = useState([])
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");


    const ITEMS_PER_PAGE = 10;




    const commentsData = useMemo(() => {
        let computedPass = Allusers;



        if (search) {
            computedPass = computedPass.filter(
                pass =>
                    pass.name.toLowerCase().includes(search.toLowerCase()) ||
                    pass.city.toLowerCase().includes(search.toLowerCase())
                    
            );
        }

        setTotalItems(computedPass.length);

        //Sorting comments


        //Current Page slice
        return computedPass.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [Allusers, currentPage, search]);

    const specificUser=(id,name,userID)=>{
        dispatch(fetch_specific_user(id))
       
        history.push(`/${name}`)
    }



    return (
        <div className="">
            <div>

                <NavBar />
            </div>

            <div className="AdminHomeMainDiv ">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-6  d-flex justify-content-center">
                            <PaginationComponent
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                                className="pagination"
                            />
                        </div>
                        <div className="col-md-6 d-flex justify-content-center flex-row-reverse">
                            <input

                                type="text"
                                className="form-control searchInput"

                                placeholder="Search"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="d-flex flex-wrap justify-content-around">
                        {commentsData.map(user => (
                            <div className="usercard ">
                                <div className='usercardImgBox'>
                                    <img src={`http://localhost:8000${user.image}`} alt=''></img>
                                </div>

                                <div className="usercardInfo">
                                    <p className="name ">{user.name}</p>
                                    <p  className="city "> {user.city}</p>
                                    <p  className="are ">{user.area}</p>
                                    <buton onClick={()=>specificUser(user.id,user.name,user.user.id)} className="btn btn-primary userViewButn ">View</buton>
                                </div>

                               
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div>
    );
};

export default AllUser;