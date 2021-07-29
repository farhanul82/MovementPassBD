import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Layout from "../hocs/Layout";

import UserNavbar from "./UserNavbar";

import { useSelector, useDispatch } from "react-redux";

import Register from "./Register";
import Movement from "./Movement";
import Profile from "./Profile";
import CreateProfiel from "./CreateProfiel";
import ApplyMovement from "./ApplyMovement";
import CollectMovementPass from "./CollectMovementPass";
import UserMovementPass from "./UserMovementPass";

import AdminHome from "./AdminHome";
import Starter from "./Starter";
import AllmovementPass from "./AllmovementPass";
import AdminUserPassView from "./AdminUserPassView";
import AllUser from "./AllUser";
import AdminFetchUser from "./AdminFetchUser";
import UserTotalPass from "./UserTotalPass";
import UserApprovedPass from "./UserApprovedPass";
import UserExpiresPass from "./UserExpiresPass";
import AllapprovedPass from "./AllapprovedPass";
import AllPendingPass from "./AllPendingPass";
import AllExpiredPass from "./AllExpiredPass";



const Main = () => {



  return (
    <div>
      <Router>
        <Layout>
          
          <Switch>
          <Route exact path="/" component={Starter} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/movement" component={Movement} />
            <Route exact path="/createProfile" component={CreateProfiel} />
            <Route exact path="/applyMovement" component={ApplyMovement} />
            <Route exact path="/collectMovement" component={CollectMovementPass} />
            <Route exact path="/userMovementPass/:id" component={UserMovementPass} />
            <Route exact path="/allPass" component={AllmovementPass} />
            <Route exact path="/allUser" component={AllUser} />
            <Route exact path="/adminHome" component={AdminHome} />
            <Route exact path="/adminUserPassView/:id" component={AdminUserPassView} />
            <Route exact path="/userTotalPass" component={UserTotalPass} />
            <Route exact path="/userApprovedPass" component={UserApprovedPass} />
            <Route exact path="/userExpiredPass" component={UserExpiresPass} />
            <Route exact path="/allApprovedPass" component={AllapprovedPass}/>
            <Route exact path="/allPendingPass" component={AllPendingPass}/>
            <Route exact path="/allExpiredPass" component={AllExpiredPass}/>


            <Route exact path="/:name" component={AdminFetchUser} />
            
            {/* <Route exact path="/facebook" component={Facebook} />
            <Route exact path="/google" component={Google} /> */}

          </Switch>
        </Layout>
      </Router>
    </div>
  );
};

export default Main;
