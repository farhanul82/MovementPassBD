import { Link, Redirect, useHistory } from "react-router-dom";
import React from 'react';

import Fade from 'react-reveal/Fade';
import Jump from 'react-reveal/Jump';


const Starter = () => {
    return (
        <div className="container-fluid starterMain">
            <div className='row'>
                <div className="col-md-12">
                    <div className="starterDiv">
                        <Fade top>
                            <h1>Welcome<br></br> to <br></br> <span>Pass Code Bd</span></h1>
                        </Fade>


                        <div>
                            <Jump>
                                <Link to='/login' className="btn starterBtn">Login</Link>
                            </Jump>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Starter;