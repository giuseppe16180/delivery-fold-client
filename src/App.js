import React from "react";
import Login from "./Components/Login";
import CustomerSignin from "./Components/CustomerSignin";
import RestaurantMenu from "./Components/RestaurantMenu";
import CheckOut from "./Components/CheckOut";
import CustomerHome from "./Components/CustomerHome";
import Cart from "./Components/Cart";
import { AppRegistry, Text } from "react-native";
import DataProvider from "./DataProvider";
import Search from "./Components/Search";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button } from "./Components/delivery-fold-components";
import OrdersHistory from "./Components/OrdersHistory";
import Order from "./Components/Order";
import Reservation from "./Components/Reservation";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.dataProvider = new DataProvider();
  }

  render() {
    return (
      <Router>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/CustomerSignin">
          <CustomerSignin />
        </Route>
        <Route path="/CustomerHome">
          <CustomerHome />
        </Route>
        <Route path="/Search">
          <Search />
        </Route>
        <Route path="/RestaurantMenu">
          <RestaurantMenu />
          </Route>
        <Route path="/OrdersHistory">
          <OrdersHistory />
        </Route>
        <Route path="/Order">
          <Order />
        </Route>
        <Route path="/Reservation">
          <Reservation />
        </Route>
        <Route path="/Cart">
          <Cart />
        </Route>
        <Route path="/CheckOut">
          <CheckOut />
        </Route>
      </Router>
    );
  }
}

export default App;
