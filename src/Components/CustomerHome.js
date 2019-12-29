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
  HeaderCard,
  FooterCard
} from "./delivery-fold-components";
import RestaurantSmall from "./RestaurantSmall";
import DataProvider from "./../DataProvider";

class CustomerHome extends React.Component {
  constructor(props) {
    super(props);
    console.debug("CustomerHome", "constructor");
    this.provider = new DataProvider();
    console.log("customer token", this.provider.token);
  }

  componentDidMount() {
    console.debug("CustomerHome", "componentDidMount");
  }

  render() {
    console.debug("CustomerHome", "render");
    return (
      <View>
        <HeaderCard>
          <Title text={"DeliveryFood Home"} />

          <View style={styles.userPanel}>
            <Button text={"carrello 🛒"} />
            <Button text={"i tuoi ordini 🍔"} />
            <Button text={"il tuo profilo 👤"} />
          </View>
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
          <FlatCard>
            <View style={styles.suggestionsRow}>
              <SubTitle text={"Ecco i nostri suggerimenti"} />
              <Label
                text={"Perché non dai uno sguardo alle offerte del giorno?"}
              />
            </View>
          </FlatCard>
          <RestaurantSmall
            image={"https://picsum.photos/id/400/400"}
            name={"Pippo balli"}
            description={"avfwegwrg"}
          />
          <RestaurantSmall
            image={"https://picsum.photos/id/400/400"}
            name={"Pippo balli"}
            description={"wefwevgwrber"}
          />
          <RestaurantSmall
            image={"https://picsum.photos/id/400/400"}
            name={"Pippo balli"}
            description={"wegwrg3h"}
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

export default CustomerHome;
