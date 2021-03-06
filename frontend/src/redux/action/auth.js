import axios from 'axios';
import { returnErrors } from './messages';
import Cookies from "js-cookie";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../Type.js'; 
import { useDispatch } from 'react-redux';


// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get('http://localhost:8000/api/user/', tokenConfig(getState))
    .then((res) => {
      console.log(res.data)
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// LOGIN USER
export const login = (username, password) =>async (dispatch) => {
  
  // Headers
  const config = {
    headers: {
      'Accept':'application/json',
      'Content-Type': 'application/json',
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

 await axios
    .post('http://localhost:8000/api/login/', body, config)
    .then((res) => {
      console.log(res.data)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response, err.response));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// REGISTER USER
export const register = ( username,email , password) => (dispatch) => {
  
  // Headers
  const config = {
    headers: {
      'Accept':'application/json',
      'Content-Type': 'application/json',
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  // Request Body
  const body = JSON.stringify( {username, email, password });
  console.log(body)
  axios
    .post('http://localhost:8000/api/register/', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post('http://localhost:8000/api/logout/', null, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: 'CLEAR_LEADS' });
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};