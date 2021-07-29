import React, { useEffect } from "react";

import { connect } from "react-redux";
import {  loadUser } from "../redux/action/auth";
import { useSelector, useDispatch } from "react-redux";


const Layout = ({  loadUser, children }) => {
 

  return (
    <div>
      
      {children}
    </div>
  );
};

export default connect(null, {  loadUser})(Layout);
