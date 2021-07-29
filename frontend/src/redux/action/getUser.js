import axios from 'axios';

import {
    GET_USER,
} from '../Type.js'; 

export const getUser=()=> async (dispatch) => {
  
    const config = {
        headers: {
          "Content-Type": "application/json",
          
          Accept: "application/json",
          
          
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      };
  const result = await axios.get("http://localhost:8000/api/getUser/",config).then(res=>console.log(res.data))
  dispatch({
    type: GET_USER,
    payload: result.data
  });
};
