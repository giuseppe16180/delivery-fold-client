import React from "react";
import { AppRegistry, View, StyleSheet } from "react-native";
import {
  Card,
  Button,
  SubTitle,
  Label,
  Title,
  Input
} from "./Components/delivery-fold-components";

class App extends React.Component {
  render() {
    return <LoginForm />;
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };
  }
  render() {
    return (
      <Card>
        <Title text={"Benvenuto in DeliveryFood"} />
        <SubTitle
          text={"Inserisci le tue credenziali per accedere al servizio"}
        />
        <View style={styles.formRow}>
          <Label text={"Inserisci la tua email:"} />
          <View style={{ width: "50%" }}>
            <Input placeholder={"email"} />
          </View>
        </View>
        <View style={styles.formRow}>
          <Label text={"Inserisci la tua password:"} />
          <View style={{ width: "50%" }}>
            <Input placeholder={"password"} />
          </View>
        </View>
        <View style={styles.submitButton}>
          <Button text={"ACCEDI"} />
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  submitButton: {
    justifyContent: "flex-end",
    flexDirection: "row"
  }
});

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});

export default App;
