import React, { Component, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../redux/action/auth';
import { createMessage } from '../redux/action/messages';
import CSRFToken from "./CSRFToken";

export const Register = () => {
  const dispatch = useDispatch()
  // const [formData, setFormData] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  //   password2: '',
  // }); 

  // const { username, email, password, password2 } = formData;
  // const onChange = (e) => setFormData({ [e.target.name]: e.target.value });

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [accountCreated, setAccountCreated] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();


    if (password1 === password2) {
      console.log(username, email, password1)
      dispatch(register(username, email, password1));
      setAccountCreated(true);
    }

  };


  if (accountCreated) {
    return <Redirect to="/login" />;
  }


  // if (this.props.isAuthenticated) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div className="container login">
      <div className='row login'>
        <div className='col-md-12 login d-flex justify-content-center'>


          <form className='loginForm' onSubmit={(e) => onSubmit(e)}>
            <h4 className="text-center">Register</h4>
            <div className='d-flex justify-content-center loginFormImgDiv'>
              <img src='/images/signup.png' alt=''></img>
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
                type="email"
                placeholder='Email'
                className="form-control"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="form-group">
              
              <input
                type="password"
                placeholder='Password'
                className="form-control"
                name="password"
                onChange={(e) => setPassword1(e.target.value)}
                value={password1}
              />
            </div>
            <div className="form-group">
              
              <input
                type="password"
                placeholder='Confirm Password'
                className="form-control"
                name="password2"
                onChange={(e) => setPassword2(e.target.value)}
                value={password2}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary mt-3">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>

  );

}



export default Register