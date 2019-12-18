import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  Card,
  Button,
  SubTitle,
  Label,
  Title,
  Input
} from "./delivery-fold-components";
import DataProvider from "./../DataProvider";

class CustomerSignin extends React.Component {
  constructor(props) {
    super(props);
    console.debug("CustomerSignin", "constructor");
    this.provider = new DataProvider();
    this.state = {
      nome: null,
      cognome: null,
      email: null,
      telefono: null,
      password: null,
      confermaPassword: null
    };
  }

  handleSubmit = () => {
    if (this.state.password !== this.state.confermaPassword) {
      alert("Le due password non combaciano");
    } else {
      console.log(this.provider.token);
      this.provider.doLogin("arrivederci");
      console.log(this.provider.token);
    }
  };

  componentDidMount() {
    console.debug("CustomerSignin", "componentDidMount");
  }

  render() {
    return (
      <Card>
        <Title text={"Benvenuto in DeliveryFood"} />
        <SubTitle
          text={"Compila i campi sottostanti per iscriverti al servizio!"}
        />

        <View style={styles.formRow}>
          <Label text={"Inserisci il tuo nome:"} />
          <View style={{ width: "50%" }}>
            <Input
              placeholder={"nome"}
              onChange={text => this.setState({ nome: text })}
            />
          </View>
        </View>

        <View style={styles.formRow}>
          <Label text={"Inserisci il tuo cognome:"} />
          <View style={{ width: "50%" }}>
            <Input
              placeholder={"cognome"}
              onChange={text => this.setState({ cognome: text })}
            />
          </View>
        </View>

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
          <Label text={"Inserisci il tuo numero di telefono:"} />
          <View style={{ width: "50%" }}>
            <Input
              placeholder={"telefono"}
              onChange={text => this.setState({ telefono: text })}
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

        <View style={styles.formRow}>
          <Label text={"Conferma la tua password:"} />
          <View style={{ width: "50%" }}>
            <Input
              placeholder={"password"}
              hide={true}
              onChange={text => this.setState({ confermaPassword: text })}
            />
          </View>
        </View>
        <View style={styles.submitButton}>
          <Button text={"REGISTRATI"} onPress={this.handleSubmit} />
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

export default CustomerSignin;
