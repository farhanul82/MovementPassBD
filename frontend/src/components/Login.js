import React, { Component, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { login, logout } from '../redux/action/auth';
import CSRFToken from "./CSRFToken";
import { fetch_User_Profile } from '../redux/action/Profile';

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // state = {
  //   username: '',
  //   password: '',
  // };



  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));

  };



  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if (isAuthenticated) {
    dispatch(fetch_User_Profile())
    return <Redirect to="/home" />
  }

  return (

    <div className="container login">
      <div className='row login'>
        <div className='col-md-12 login d-flex justify-content-center'>
          <form className='loginForm' onSubmit={(e) => onSubmit(e)}>
            <h2 className="text-center mb-3">Login</h2>
            <div className='d-flex justify-content-center loginFormImgDiv'>
              <img src='/images/loginImg.jpg' alt=''></img>
            </div>
            <CSRFToken />
            <div className="form-group">

              <input
                type="text"
                placeholder='Mobile No'
                className="form-control"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>

            <div className="form-group">

              <input
                type="password"
                placeholder='Password'
                className="form-control"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn mt-4 ">
                Login
              </button>
            </div>
            <p className="mb-4 mt-3">
              Don't have an account? <Link to="/signup">Register</Link>
            </p>
          </form>
        </div>
      </div>


    </div>

  );
}


// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

export default Login;


