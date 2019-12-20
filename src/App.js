import React from "react";
import Login from "./Components/Login";
import CustomerSignin from "./Components/CustomerSignin";
import CustomerHome from "./Components/CustomerHome";
import { AppRegistry } from "react-native";
import DataProvider from "./DataProvider";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button } from "./Components/delivery-fold-components";

function App() {
  return (
    <Router>
      <Route path="/Login">
        <Login />
      </Route>
      <Route path="/CustomerSignin">
        <CustomerSignin />
      </Route>
      <Route path="/CustomerHome">
        <CustomerHome />
      </Route>
    </Router>
  );
}

const provider = new DataProvider();

export default App;
