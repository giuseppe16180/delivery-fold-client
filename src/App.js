import React from "react";
import Login from "./Components/Login";
import CustomerSignin from "./Components/CustomerSignin";
import { AppRegistry } from "react-native";
import DataProvider from "./DataProvider";

class App extends React.Component {
  render() {
    return <Login />;
  }
}

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});

const provider = new DataProvider();

export default App;
