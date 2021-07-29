import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from './NavBar';
import PaginationComponent from './Pagination';
import Search from './Search';

import { Link, useHistory } from "react-router-dom";

import { GrView } from 'react-icons/gr';

const AllExpiredPass = () => {
    let history = useHistory();

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");


    const ITEMS_PER_PAGE = 10;

    const AllPass = useSelector(state => state.adminDashboard.AllExpiredPass);


    console.log(AllPass)

    const commentsData = useMemo(() => {
        let computedPass = AllPass;
        
        

        if (search) {
            computedPass=  computedPass.filter(
                pass =>
                    pass.user.username.toLowerCase().includes(search.toLowerCase()) ||
                    pass.id.includes(search)
            );
        }

        setTotalItems(computedPass.length);

        //Sorting comments


        //Current Page slice
        return computedPass.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [AllPass, currentPage, search]);


    return (
        <div className="">
            <div>
                <NavBar />
            </div>
            <div className="AdminHomeMainDiv ">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-6">
                            <PaginationComponent
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                                className="pagination"
                            />
                        </div>
                        <div className="col-md-6 d-flex flex-row-reverse">
                            <input
                           
                                type="text"
                                className="form-control searchInput"
                               
                                placeholder="Search"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div class="table_responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th >User Name</th>
                                <th >From</th>
                                <th > To</th>
                                <th >Track Id</th>
                                <th>Status</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {commentsData.map(pass => (
                                <tr>
                                    <th>{pass.user.username}</th>
                                    <td>{pass.from_m}</td>
                                    <td>{pass.to_m}</td>
                                    <td>{pass.id}</td>
                                    {pass.is_approved ? (
                                        <td>Approved</td>
                                    ) : (
                                        <td>Pending</td>
                                    )}
                                    <td><button onClick={()=>history.push(`/adminUserPassView/${pass.id}`)} className="passViewBtn"><GrView/></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
               </div>
                </div>
            </div>
        </div>
    );
};


export default AllExpiredPass;