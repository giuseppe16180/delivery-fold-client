import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  Card,
  SubTitle,
  Label,
  Title,
  Separator,
  FlatCard,
  SmallLabel,
  HeaderCard,
  Button,
  VerySmallLabel
} from "./delivery-fold-components";
import Footer from "./Footer";
import DataProvider from "../DataProvider";
import MenuEntryOrder from "./MenuEntryOrder";

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    console.debug("Reservation", "constructor");
    this.provider = new DataProvider();
    this.state = {
      id: "id",
      num_persone: "num_persone",
      orario: "orario",
      data: "data",
      stato: "stato",
      ristoranti: [],
      totale: "totale",
      piatti: []
    };
  }

  componentDidMount() {
    console.debug("Reservation", "componentDidMount");
    this.provider.getReservationOrder().then(response => {
      console.log(response);
      this.setState({
        id: response.info.ordine.id,
        num_persone: response.info.num_persone,
        orario: response.info.orario,
        data: response.info.ordine.data,
        stato: response.info.ordine.stato,
        ristoranti: response.ristoranti,
        totale: response.pagamento.totale,
        piatti: response.piatti
      });
    });
  }

  render() {
    console.debug("Reservation", "render");
    return (
      <View>
        <HeaderCard>
          <Title text={"DeliveryFood Ordine"} />
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
            <View style={styles.restaurantInfoLeft}>
              <Title text={"Prenotazione Tavolo, Ristoranteeeeee"} />
              <SubTitle
                text={"Numero persone prenotazione: " + this.state.num_persone}
              />
              <SubTitle text={"Orario: " + this.state.orario} />
              <SubTitle text={"Totale €" + this.state.totale} />
              <Label text={this.state.data} />
            </View>
            <View style={styles.restaurantInfoRight}>
              <VerySmallLabel text={this.state.orario} />
              <View style={styles.rating} />
            </View>
          </FlatCard>
          <Separator />
          <FlatList
            data={this.state.piatti}
            renderItem={({ item }) => (
              <MenuEntryOrder
                image={"https://picsum.photos/id/400/400"}
                name={item.nome}
                price={item.prezzo}
                description={item.descrizione}
              />
            )}
            keyExtractor={item => item.id}
          />
        </Card>
        <Separator times={4} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rating: { alignItems: "flex-end" },

  restaurantInfoRight: {
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "space-evenly",
    flex: 2
  },
  restaurantInfoLeft: {
    flex: 5,
    flexDirection: "column"
  },

  menuRow: {
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

export default Reservation;
