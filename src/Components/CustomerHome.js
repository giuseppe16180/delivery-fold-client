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
import RestaurantSmall from "./RestaurantSmall";
import MenuEntry from "./MenuEntry";
import DataProvider from "./../DataProvider";

class CustomerHome extends React.Component {
  constructor(props) {
    super(props);
    console.debug("CustomerHome", "constructor");
    this.provider = new DataProvider();
    console.log("customer token", this.provider.token);
    this.state = {
      specialOffers: [],
      isReady: false
    };
  }

  componentDidMount() {
    console.debug("CustomerHome", "componentDidMount");
    if (!this.provider.isGuest()) {
      this.provider
        .doGetSpecialOffers()
        .then(response => {
          console.log(response);
          this.setState({ specialOffers: response, isReady: true });
        })
        .catch(err => {
          if (err === "NoResults") {
            alert("");
          } else if (err === "FailedToFetch") {
            alert("Impossibile contattare il server! Riprova più tardi");
          }
        });
    }
  }

  handleAddToCart = id => {
    this.provider
      .doAddToCart(id)
      .then(alert("Aggiunto al carrello!"))
      .catch(error => {
        if (error == "FailedToFetch") {
          alert("Impossibile contattere il server");
        }
      });
  };

  render() {
    console.debug("CustomerHome", "render");
    return (
      <View>
        <HeaderCard>
          <Title text={"DeliveryFood Home"} />
          {!this.provider.isGuest() && (
            <View style={styles.userPanel} sho>
              <Button
                text={"Carrello 🛒"}
                onPress={this.provider.navigateCart}
              />
              <Button
                text={"i tuoi ordini 🍔"}
                onPress={this.provider.navigateOrders}
              />
              <Button text={"il tuo profilo 👤"} />
              <Button text={"Logout"} onPress={this.provider.doLogout} />
            </View>
          )}
        </HeaderCard>

        <Card>
          <FlatCard>
            <View style={styles.searchRow}>
              <SubTitle
                text={"Un po' di fame? Cerca tra i nostri ristoranti!"}
              />
              <View style={styles.searchView}>
                <Input
                  placeholder={"Cerca"}
                  onPress={this.provider.navigateSearch}
                ></Input>
                <Button text={"🔎"} onPress={this.provider.navigateSearch} />
              </View>
            </View>
          </FlatCard>
          <Separator />
          {this.state.isReady && (
            <FlatCard>
              <View style={styles.suggestionsRow}>
                <SubTitle text={"Ecco i nostri suggerimenti"} />
                <Label
                  text={
                    "Perché non dai uno sguardo alle offerte speciali a te riservate?"
                  }
                />
              </View>
            </FlatCard>
          )}

          {this.state.isReady && (
            <FlatList
              data={this.state.specialOffers}
              renderItem={({ item }) => (
                <MenuEntry
                  image={item.info.immagine}
                  name={item.info.nome}
                  price={item.ristorante.nome + "  -  " + item.info.prezzo}
                  description={
                    item.info.descrizione +
                    "\n\nValido fino al: " +
                    new Date(item.scadenza).toLocaleDateString()
                  }
                  onAddToCart={() => this.handleAddToCart(item.info.id)} //TODO non so se funziona così
                />
              )}
              keyExtractor={item => item.id}
            />
          )}
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

export default CustomerHome;
