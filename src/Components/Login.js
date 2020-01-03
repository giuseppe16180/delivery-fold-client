import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Card,
  Button,
  SubTitle,
  Label,
  Title,
  Input,
  Separator,
  FlatCard,
  HeaderCard
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

  handleLogin = () => {
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

  handleGuestLogin = () => {
    this.provider.doGuestLogin().catch(error => {
      console.log(error);
      if (error == "LoginIncorrect") {
        alert(
          "Errore interno, contatta lo sviluppatore se il problema persiste"
        );
      } else if (error == "FailedToFetch") {
        alert("impossibile contattare il server, prova più tardi");
      }
    });
  };
  handleSignin = () => {};

  render() {
    return (
      <View>
        <HeaderCard>
          <Title text={"Benvenuto in DeliveryFood"} />
        </HeaderCard>
        <Separator times={1} />
        <View style={styles.small}>
          <Card>
            <FlatCard>
              <View style={styles.mammaRow}>
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
                  <Button text={"Accedi"} onPress={this.handleLogin} />
                </View>
              </View>
            </FlatCard>
            <FlatCard>
              <View style={styles.mammaRow}>
                <SubTitle text={"Non ancora registrato?"} />
                <View style={styles.formRow}>
                  <Label text={"Accedi come ospite"} />
                  <View style={{ alignContent: "flex-end" }}>
                    <Button text={"Accedi"} onPress={this.handleGuestLogin} />
                  </View>
                </View>
                <View style={styles.formRow}>
                  <Label text={"Registrati gratuitamente"} />
                  <View style={{ alignContent: "flex-end" }}>
                    <Button text={"Registrati"} onPress={this.handleSubmit} />
                  </View>
                </View>
              </View>
            </FlatCard>
          </Card>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  small: {
    paddingLeft: "15%",
    paddingRight: "15%"
  },
  mammaRow: {
    flexDirection: "column",
    width: "100%"
  },
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
