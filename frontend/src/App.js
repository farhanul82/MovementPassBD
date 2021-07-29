import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Main from "./components/Main.js";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/combinreducers";

// import { ConfigureStore } from "./Redux/Reducer/combineReducer";

// const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
