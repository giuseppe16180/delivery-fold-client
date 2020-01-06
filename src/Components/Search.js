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
import DataProvider from "./../DataProvider";

class Search extends React.Component {
  constructor(props) {
    super(props);
    console.debug("Search", "constructor");
    this.provider = new DataProvider();
    console.log("customer token", this.provider.token);
    this.state = { query: null, results: null };
    this.provider
      .doGetAllRestaurants()
      .then(response => this.setState({ results: response }));
    this.handleSearch = this.handleSearch.bind(this); // Era questo il problema   https://stackoverflow.com/questions/39176248/react-js-cant-read-property-of-undefined
  }

  componentDidMount() {
    console.debug("Search", "componentDidMount");
  }

  handleRestaurantMenu = id => {
    this.provider.navigateRestaurantMenu(id);
  };

  handleSearch() {
    this.provider
      .doSearch(this.state.query)
      .then(response => this.setState({ results: response }))
      .catch(error => {
        console.log(error);
        if (error == "NoResults") {
          alert("Nessun Risultato");
        } else if (error == "FailedToFetch") {
          alert("impossibile contattare il server, prova più tardi");
        }
      });
  }

  render() {
    console.debug("Search", "render");
    return (
      <View>
        <HeaderCard>
          <Title text={"DeliveryFood Ricerca"} />

          <View style={styles.userPanel}>
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
            {!this.provider.isGuest() && (
              <Button text={"Logout"} onPress={this.provider.doLogout} />
            )}
          </View>
        </HeaderCard>

        <Card>
          <FlatCard>
            <View style={styles.searchRow}>
              <SubTitle text={"Effettua una ricerca"} />
              <View style={styles.searchView}>
                <Input
                  placeholder={"Cerca"}
                  onChange={text => this.setState({ query: text })}
                ></Input>
                <Button text={"🔎"} onPress={this.handleSearch} />
              </View>
            </View>
          </FlatCard>
          <FlatList
            data={this.state.results}
            renderItem={({ item }) => {
              const orari = item.ristorante.orario.split("/");
              orari[0] = "Lun " + orari[0] + " ";
              orari[1] = "Mar " + orari[1] + "\n";
              orari[2] = "Mer " + orari[2] + " ";
              orari[3] = "Gio " + orari[3] + "\n";
              orari[4] = "Ven " + orari[4] + " ";
              orari[5] = "Sab " + orari[5] + "\n";
              orari[6] = "Dom " + orari[6] + " ";
              return (
                <RestaurantSmall
                  image={item.ristorante.fotoLocale}
                  name={item.ristorante.nome}
                  description={
                    item.ristorante.indirizzo +
                    (item.mediaValutazioni == null
                      ? " - Nessuna valutazione"
                      : " - " + item.mediaValutazioni + "★")
                  }
                  descriptionSmall={orari}
                  onPressDetails={() =>
                    this.handleRestaurantMenu(item.ristorante.id)
                  }
                />
              );
            }}
            keyExtractor={item => item.ristorante.id}
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

export default Search;
