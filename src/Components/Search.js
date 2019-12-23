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
  }

  componentDidMount() {
    console.debug("Search", "componentDidMount");
  }

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
              <SubTitle text={"Ecco i risultati della tua ricerca"} />
              <Label text={this.provider.query} />
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
                name={item.nome}
                description={item.indirizzo + item.orario}
              />
            )}
            keyExtractor={item => item.id}
          />
        </Card>

        <FooterCard>
          <Label
            text={
              "DeliveryFood - 2020 - Gruppo 8 Progetto Ingegneria del Software"
            }
          />
        </FooterCard>
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
