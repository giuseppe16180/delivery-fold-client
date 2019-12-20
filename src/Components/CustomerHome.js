import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Card,
  Button,
  SubTitle,
  Label,
  Title,
  Input,
  Separator
} from "./delivery-fold-components";
import RestaurantSmall from "./RestaurantSmall";

class CustomerHome extends React.Component {
  render() {
    return (
      <Card>
        <Title text={"DeliveryFood Home"} />
        <Separator />

        <SubTitle text={"Questa è la tua area utente:"} />
        <View style={styles.userPanel}>
          <Button text={"Visualizza i tuoi ordini"} />
          <Button text={"Modifica le tue info"} />
          <Button text={"Consulta le offerte speciali"} />
        </View>
        <Separator />
        <View style={styles.searchRow}>
          <SubTitle text={"Un po' di fame? Cerca tra i nostri ristoranti!"} />
          <View style={styles.searchView}>
            <Input placeholder={"Cerca"}></Input>
            <Button text={"🔎"} />
          </View>
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
