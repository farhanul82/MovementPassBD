import axios from 'axios';

import {
    FETCH_ADMIN_DASHBOARD,
    FETCH_RECENT_USERS,
    FETCH_RECENT_PASS,
    FETCH_All_PASS,
    APPROVE_USER_PASS,
    ADMIN_FETCH_All_USER,
    FETCH_SPECIFIC_USER,
    FETCH_SPECIFIC_USER_PASS,
    FETCH_All_APPROVED_PASS,
    FETCH_All_PENDING_PASS,
    FETCH_All_EXPIRED_PASS
    
} from '../Type.js'; 

export const fetch_admin_dashboard=()=> async (dispatch) => {
  
    const config = {
        headers: {
          "Content-Type": "application/json",
          
          Accept: "application/json",
          
          
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      };
  const result = await axios.get("http://localhost:8000/api/adminDashboard/",config)
  dispatch({
    type: FETCH_ADMIN_DASHBOARD,
    payload: result.data
  });
};


export const fetch_recent_user=()=> async (dispatch) => {
  
  const config = {
      headers: {
        "Content-Type": "application/json",
        
        Accept: "application/json",
        
        
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    };
const result = await axios.get("http://localhost:8000/api/recentUsers/",config)
dispatch({
  type: FETCH_RECENT_USERS,
  payload: result.data
});
};


export const fetch_recent_pass=()=> async (dispatch) => {
  
  const config = {
      headers: {
        "Content-Type": "application/json",
        
        Accept: "application/json",
        
        
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    };
const result = await axios.get("http://localhost:8000/api/recentPass/",config)
dispatch({
  type: FETCH_RECENT_PASS,
  payload: result.data
});
};



export const fetch_all_pass=()=> async (dispatch) => {
  
  const config = {
      headers: {
        "Content-Type": "application/json",
        
        Accept: "application/json",
        
        
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    };
const result = await axios.get("http://localhost:8000/api/allMovementPass/",config)
dispatch({
  type: FETCH_All_PASS,
  payload: result.data
});
};


export const fetch_all_aprroved_pass=()=> async (dispatch) => {
  
  const config = {
      headers: {
        "Content-Type": "application/json",
        
        Accept: "application/json",
        
        
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    };
const result = await axios.get("http://localhost:8000/api/approveUerPass/",config)
dispatch({
  type: FETCH_All_APPROVED_PASS,
  payload: result.data
});
};



export const fetch_all_pending_pass=()=> async (dispatch) => {
  
  const config = {
      headers: {
        "Content-Type": "application/json",
        
        Accept: "application/json",
        
        
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    };
const result = await axios.get("http://localhost:8000/api/userPendingPass/",config)
dispatch({
  type: FETCH_All_PENDING_PASS,
  payload: result.data
});
};




export const fetch_all_expired_pass=()=> async (dispatch) => {
  
  const config = {
      headers: {
        "Content-Type": "application/json",
        
        Accept: "application/json",
        
        
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    };
const result = await axios.get("http://localhost:8000/api/expireUerPass/",config)
dispatch({
  type: FETCH_All_EXPIRED_PASS,
  payload: result.data
});
};



export const fetch_all_users=()=> async (dispatch) => {
  
  const config = {
      headers: {
        "Content-Type": "application/json",
        
        Accept: "application/json",
        
        
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    };
const result = await axios.get("http://localhost:8000/api/adminGetAllUser/",config)
dispatch({
  type: ADMIN_FETCH_All_USER,
  payload: result.data
});
};


export const fetch_specific_user=(id)=> async (dispatch) => {
  
  const config = {
      headers: {
        "Content-Type": "application/json",
        
        Accept: "application/json",
        
        
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    };
const result = await axios.get(`http://localhost:8000/api/adminGetAllUser/${id}/`,config)
dispatch({
  type: FETCH_SPECIFIC_USER,
  payload: result.data
});
};


// export const fetch_specific_user_pass=(id)=> async (dispatch) => {
  
//   const config = {
//       headers: {
//         "Content-Type": "application/json",
        
//         Accept: "application/json",
        
        
//         Authorization: `Token ${localStorage.getItem("token")}`,
//       },
//     };


// const result = await axios.get(`http://localhost:8000/api/userMovementPass/${id}`,config).then(res=>console.log(res.data))
// dispatch({
//   type: FETCH_SPECIFIC_USER_PASS,
//   payload: result.data
// });
// };







