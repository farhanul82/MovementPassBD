import axios from 'axios';

import Cookies from "js-cookie";

import {
    FETCH_USER_ALL_MOVEMENT_PASS,
    FETCH_USER_MOVEMENT_PASS,
    
} from '../Type.js'; 

export const fetch_User_MovementPass=()=> async (dispatch) => {
  
    const config = {
        headers: {
          "Content-Type": "application/json",
          
          Accept: "application/json",
          
          
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      };
  const result = await axios.get("http://localhost:8000/api/applyForPass/",config)
  dispatch({
    type: FETCH_USER_ALL_MOVEMENT_PASS,
    payload: result.data
  });
};



export const fetch_User_single_MovementPass=(id)=> async (dispatch) => {
  
    const config = {
        headers: {
          "Content-Type": "application/json",
          
          Accept: "application/json",
          
          
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      };
  const result = await axios.get(`http://localhost:8000/api/applyForPass/${id}/`,config)
  
  dispatch({
    type: FETCH_USER_MOVEMENT_PASS,
    payload: result.data
  });
};

