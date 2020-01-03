import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  Card,
  Button,
  SubTitle,
  Label,
  Title,
  Input,
  Separator,
  FlatCard,
  HeaderCard,
  FooterCard,
  Checkbox
} from "./delivery-fold-components";
import DataProvider from "./../DataProvider";

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    console.debug("CheckOut", "constructor");
    this.provider = new DataProvider();
    this.state = {
      total: 0.0,
      isDeliveryOrder: true,
      indirizzoFatturazione: null,
      intestatario: null,
      numeroCarta: null,
      ccv: null,
      scadenza: null,
      indirizzo: null,
      numPersone: 0,
      orario: null,
      recapitoNome: null,
      reacpitoCognome: null,
      reacpitoEmail: null,
      recapitoTelefono: null
    };
  }

  componentDidMount() {
    console.debug("CheckOut", "componentDidMount");
    this.provider
      .doGetCartEntries()
      .then(response => {
        this.setState({ total: response.totale });
      })
      .catch(error => console.error(error));
  }

  handleCheckOut = () => {
    const data = {
      ordine: {
        data: new Date(),
        commento: "",
        tipo: this.state.isDeliveryOrder
      },
      domicilio: {
        indirizzo: this.state.indirizzo
      },
      carta: {
        indirizzo: this.state.indirizzoFatturazione,
        intestatario: this.state.intestatario,
        numero: this.state.numeroCarta,
        scadenza: this.state.scadenza
      },
      prenotazione: null,
      cvv: this.state.ccv
    };

    if (!this.state.isDeliveryOrder) {
      data.ordine.tipo = this.state.isDeliveryOrder;
      data.domicilio = null;
      data.prenotazione = {
        num_persone: this.state.numPersone,
        orario: this.state.orario
      };
    }

    this.provider
      .doCheckOut(data)
      .then(result => alert("Ordine completato!", result.value))
      .catch("Riprova più tardi");
  };

  render() {
    console.debug("CheckOut", "render");
    return (
      <View>
        <HeaderCard>
          <Title text={"DeliveryFood Check Out"} />
          <View style={styles.userPanel}>
            <Button
              text={"Home 🏠"}
              onPress={this.provider.navigateCustomerHome}
            />
            <Button text={"Carrello 🛒"} onPress={this.provider.navigateCart} />
            {!this.provider.isGuest() && (
              <Button
                text={"i tuoi ordini 🍔"}
                onPress={this.provider.navigateOrders}
              />
            )}
            {!this.provider.isGuest() && (
              <Button
                text={"il tuo profilo 👤"}
                onPress={this.provider.navigateCustomerProfile}
              />
            )}
          </View>
        </HeaderCard>

        <Card>
          <FlatCard>
            <View style={styles.forms}>
              <SubTitle text={"Inserisci i dati di pagamento"} />
              <View style={styles.formRow}>
                <Label text={"Inserisci il tuo indirizzo di fatturazione:"} />
                <View style={{ width: "50%" }}>
                  <Input
                    placeholder={"indirizzo"}
                    onChange={text =>
                      this.setState({ indirizzoFatturazione: text })
                    }
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <Label text={"Inserisci l'intestatario della carta:"} />
                <View style={{ width: "50%" }}>
                  <Input
                    placeholder={"nome e cognome"}
                    onChange={text => this.setState({ intestatario: text })}
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <Label text={"Inserisci dettagli carta:"} />
                <View style={{ width: "50%" }}>
                  <Input
                    placeholder={"numero di carta"}
                    onChange={text => this.setState({ numeroCarta: text })}
                  />
                </View>
                <View style={{ width: "10%" }}>
                  <Input
                    placeholder={"CCV"}
                    onChange={text => this.setState({ ccv: text })}
                  />
                </View>
                <View style={{ width: "15%" }}>
                  <Input
                    placeholder={"scadenza"}
                    onChange={text => this.setState({ scadenza: text })}
                  />
                </View>
              </View>
            </View>
          </FlatCard>

          <FlatCard>
            <View style={styles.forms}>
              <SubTitle text={"Dettagli ordine"} />
              <Separator times={0.25} />

              <View
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                <View style={styles.searchButton}>
                  <Label text={"Consegna domicilio"} />

                  <Checkbox
                    isChecked={this.state.isDeliveryOrder}
                    onPress={() =>
                      this.setState(prev => ({
                        isDeliveryOrder: !prev.isDeliveryOrder
                      }))
                    }
                  />
                </View>

                <View style={styles.searchButton}>
                  <Label text={"Consumazione al locale"} />

                  <Checkbox
                    isChecked={!this.state.isDeliveryOrder}
                    onPress={() =>
                      this.setState(prev => ({
                        isDeliveryOrder: !prev.isDeliveryOrder
                      }))
                    }
                  />
                </View>
              </View>
              <Separator times={0.5} />
              <View
                style={{
                  ...styles.formRow,
                  opacity: this.state.isDeliveryOrder ? 1 : 0.4
                }}
                pointerEvents={this.state.isDeliveryOrder ? "auto" : "none"}
              >
                <View style={styles.formRow}>
                  <Label text={"Inserisci l'indirizzo di consegna:"} />
                  <View style={{ width: "40%" }}>
                    <Input
                      placeholder={"indirizzo"}
                      onChange={text => this.setState({ indirizzo: text })}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  ...styles.formRow,
                  opacity: this.state.isDeliveryOrder ? 0.4 : 1
                }}
                pointerEvents={this.state.isDeliveryOrder ? "none" : "auto"}
              >
                {!this.provider.isGuest() && (
                  <View style={styles.formRow}>
                    <Label text={"Inserisci i dettagli della prenotazione:"} />

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end"
                      }}
                    >
                      <View style={{ width: "35%" }}>
                        <Input
                          placeholder={"numero presone"}
                          onChange={text => this.setState({ numPersone: text })}
                        />
                      </View>
                      <View style={{ width: "30%" }}>
                        <Input
                          placeholder={"orario"}
                          onChange={text => this.setState({ orario: text })}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </View>
              {this.provider.isGuest() && (
                <View style={styles.formRow}>
                  <Label text={"Inserisci recapiti:"} />
                  <View style={{ width: "20%" }}>
                    <Input
                      placeholder={"nome"}
                      onChange={text => this.setState({ recapitoNome: text })}
                    />
                  </View>
                  <View style={{ width: "20%" }}>
                    <Input
                      placeholder={"cognome"}
                      onChange={text =>
                        this.setState({ reacpitoCognome: text })
                      }
                    />
                  </View>
                  <View style={{ width: "20%" }}>
                    <Input
                      placeholder={"email"}
                      onChange={text => this.setState({ reacpitoEmail: text })}
                    />
                  </View>
                  <View style={{ width: "20%" }}>
                    <Input
                      placeholder={"telefono"}
                      onChange={text =>
                        this.setState({ recapitoTelefono: text })
                      }
                    />
                  </View>
                </View>
              )}
            </View>
          </FlatCard>

          <FlatCard>
            <View style={styles.searchRow}>
              <View style={styles.suggestionsRow}>
                <SubTitle text={"Completa l'ordine!"} />
                <Label text={"Totale " + this.state.total + "€"} />
              </View>
              <Button text={"Conferma"} onPress={this.handleCheckOut} />
            </View>
          </FlatCard>
        </Card>
        <Separator times={4} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  checkboxesRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  formRow: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  submitButton: {
    justifyContent: "flex-end",
    flexDirection: "row"
  },
  forms: {
    width: "100%",
    flexDirection: "column"
  },
  suggestionsRow: {
    flexDirection: "column"
  },
  userPanel: { flexDirection: "row" },
  searchView: { alignItems: "center", flexDirection: "row" },
  searchRow: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  searchButton: {
    alignItems: "center",
    flexDirection: "row"
  }
});

export default CheckOut;
