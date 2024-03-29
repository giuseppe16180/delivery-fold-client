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
  FooterCard
} from "./delivery-fold-components";
import CartEntry from "./CartEntry";
import DataProvider from "./../DataProvider";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    console.debug("Cart", "constructor");
    this.provider = new DataProvider();
    this.state = {
      total: "0.00",
      entries: []
    };
  }

  componentDidMount() {
    console.debug("Cart", "componentDidMount");
    this.provider
      .doGetCartEntries()
      .then(response => {
        console.debug("Cart", "doGetCartEntries", response);
        this.setState({ total: response.totale, entries: response.piatti });
      })
      .catch(error => console.error(error));
  }

  handleRemove = id => {
    this.provider
      .doRemoveCartEntry(id, 1)
      .then(alert("Rimosso"))
      .catch(error => {
        if (error == "NoResults") {
          alert("Impossibile rimuovere");
        } else if (error == "FailedToFetch") {
          alert("Impossibile contattere il server");
        }
      });
  };

  handleRemoveQuantity = (id, quantity) => {
    this.provider
      .doRemoveCartEntry(id, quantity)
      .then(alert("Rimosso tutto"))
      .catch(error => {
        if (error == "NoResults") {
          alert("Impossibile rimuovere");
        } else if (error == "FailedToFetch") {
          alert("Impossibile contattere il server");
        }
      });
  };

  render() {
    console.debug("Cart", "render");
    return (
      <View>
        <HeaderCard>
          <Title text={"DeliveryFood Carrello"} />
          <View style={styles.userPanel}>
            <Button
              text={"Home 🏠"}
              onPress={this.provider.navigateCustomerHome}
            />
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
            {!this.provider.isGuest() && (
              <Button text={"Logout"} onPress={this.provider.doLogout} />
            )}
          </View>
        </HeaderCard>

        <Card>
          <FlatCard>
            <View style={styles.searchRow}>
              <View style={styles.suggestionsRow}>
                <SubTitle text={"Procedi all'ordine!"} />
                <Label
                  text={
                    "Totale " +
                    (this.state.total != null ? this.state.total : 0) +
                    "€"
                  }
                />
              </View>
              <View
                style={{ opacity: this.state.total != null ? 1 : 0.4 }}
                pointerEvents={this.state.total != null ? "auto" : "none"}
              >
                <Button
                  text={"check out"}
                  onPress={this.provider.navigateCheckOut}
                />
              </View>
            </View>
          </FlatCard>
          <Separator />

          <FlatList
            data={this.state.entries}
            renderItem={({ item }) => (
              <CartEntry
                image={item.piatto.immagine}
                name={item.piatto.nome}
                price={item.piatto.prezzo}
                count={item.quantita}
                onRemove={() => this.handleRemove(item.piatto.id)}
                onRemoveQuantity={() =>
                  this.handleRemoveQuantity(item.piatto.id, item.quantita)
                }
              />
            )}
            keyExtractor={item => item.piatto.id}
          />
        </Card>
        <Separator times={4} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    justifyContent: "flex-end",
    flexDirection: "row"
  }
});

export default Cart;
