import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Card,
  Button,
  SubTitle,
  Label,
  Title,
  Input
} from "./delivery-fold-components";
import DataProvider from "./../DataProvider";

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.debug("Login", "constructor");
    this.provider = new DataProvider();
    this.state = {
      email: null,
      password: null
    };
  }

  handleSubmit = () => {
    console.debug(
      "Login",
      "handleSubmit",
      this.state.email,
      this.state.password
    );
    this.provider
      .doLogin(this.state.email, this.state.password)
      .catch(error => {
        console.log(error);
        if (error == "LoginIncorrect") {
          alert("Email o password errate");
        } else if (error == "FailedToFetch") {
          alert("impossibile contattare il server, prova più tardi");
        }
      });
  };

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
            <Input
              placeholder={"email"}
              onChange={text => this.setState({ email: text })}
            />
          </View>
        </View>
        <View style={styles.formRow}>
          <Label text={"Inserisci la tua password:"} />
          <View style={{ width: "50%" }}>
            <Input
              placeholder={"password"}
              hide={true}
              onChange={text => this.setState({ password: text })}
            />
          </View>
        </View>
        <View style={styles.submitButton}>
          <Button text={"ACCEDI"} onPress={this.handleSubmit} />
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

export default Login;
