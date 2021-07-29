import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import Thunk from "redux-thunk";
import AdminDashboard from "./reducer/AdminDashboard";
import { auth } from "./reducer/auth";
import MovementPass from "./reducer/MovementPass";
import ProfileReducer from "./reducer/Profile";


const store = createStore(
  combineReducers({
    auth: auth,
    profile: ProfileReducer,
    MovementPass:MovementPass,
    adminDashboard: AdminDashboard,
  }),
  composeWithDevTools(applyMiddleware(Thunk))
);
export default store;
