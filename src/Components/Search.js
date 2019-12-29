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
      .getAllRestaurants()
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
            <Button text={"i tuoi ordini"} />
            <Button text={"il tuo profilo"} />
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
            renderItem={({ item }) => (
              <RestaurantSmall
                image={"https://picsum.photos/id/400/400"}
                name={item.ristorante.nome}
                description={item.ristorante.indirizzo}
                descriptionSmall={item.ristorante.orario}
                onPressDetails={() =>
                  this.handleRestaurantMenu(item.ristorante.id)
                }
              />
            )}
            keyExtractor={item => item.ristorante.id}
          />
        </Card>
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
