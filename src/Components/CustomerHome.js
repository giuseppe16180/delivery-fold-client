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

class CustomerHome extends React.Component {
  render() {
    return (
      <View>
        <HeaderCard>
          <Title text={"DeliveryFood Home"} />
          <View style={styles.searchView}>
            <Input placeholder={"Cerca"}></Input>
            <Button text={"🔎"} />
          </View>
          <View style={styles.userPanel}>
            <Button text={"i tuoi ordini"} />
            <Button text={"il tuo profilo"} />
          </View>
        </HeaderCard>

        <Card>
          <View style={styles.searchRow}>
            <SubTitle text={"Un po' di fame? Cerca tra i nostri ristoranti!"} />
          </View>
          <Separator />

          <SubTitle text={"Ecco i nostri suggerimenti"} />
          <Label text={"Perché non dai uno sguardo alle offerte del giorno?"} />

          <RestaurantSmall />
          <RestaurantSmall />
          <RestaurantSmall />
          <RestaurantSmall />
          <RestaurantSmall />
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
  userPanel: { flexDirection: "row" },
  searchView: { alignItems: "center", flexDirection: "row" },
  searchRow: {
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
