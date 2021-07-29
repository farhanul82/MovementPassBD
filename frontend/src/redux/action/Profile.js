import axios from 'axios';

import {
FETCH_USER_PROFILE
} from '../Type.js'; 

export const fetch_User_Profile=()=> async (dispatch) => {
  
    const config = {
        headers: {
          "Content-Type": "application/json",
          
          Accept: "application/json",
          
          
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      };
  const result = await axios.get("http://localhost:8000/api/userProfile/",config)
  dispatch({
    type: FETCH_USER_PROFILE,
    payload: result.data
  });
};