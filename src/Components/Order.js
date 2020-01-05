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
import DataProvider from "./../DataProvider";
import MenuEntryOrder from "./MenuEntryOrder";

class Order extends React.Component {
  constructor(props) {
    super(props);
    console.debug("Order", "constructor");
    this.provider = new DataProvider();
    this.state = {
      id: "id",
      ristoranti: "ristoranti",
      telefono: "telefono_cliente",
      data: "data",
      stato: "stato",
      tipo: "tipo",
      indirizzo: "indirizzo",
      tempo_consegna: "tempo di consegna",
      totale: "totale",
      commento: "commento",
      piatti: []
    };
  }

  componentDidMount() {
    console.debug("Order", "componentDidMount");
    this.provider.getBookedOrder().then(response => {
      console.log(response);
      this.setState({
        id: response.info.ordine.id,
        ristoranti: response.ristoranti,
        telefono: response.info.ordine.telefono,
        data: response.info.ordine.data,
        stato: response.info.ordine.stato,
        tipo: response.info.ordine.tipo,
        indirizzo: response.info.indirizzo,
        tempo_consegna: response.info.ordine.tempo_consegna,
        totale: response.pagamento.totale,
        commento: response.info.ordine.commento,
        piatti: response.piatti
      });
    });
  }

  render() {
    console.debug("Order", "render");
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
              <Title
                text={
                  "Ordine a domicilio n." + this.state.id + ", " + this.state.ristoranti
                }
              />
              <SubTitle text={"Tempo Consegna " + this.state.tempo_consegna} />
              <SubTitle
                text={"Indirizzo di consegna: " + this.state.indirizzo}
              />
              <SubTitle text={"Totale " + this.state.totale + "€"} />
              <Label text={this.state.stato} />
              <Label text={"Tel. " + this.state.telefono} />
            </View>
            <View style={styles.restaurantInfoRight}>
              <VerySmallLabel text={this.state.orario} />
              <View style={styles.rating} />
            </View>
          </FlatCard>
          <div>
            {this.state.commento ? (
              <FlatCard>
              <View style={styles.content}>
                <SubTitle text={"Commento:"} />
                <Label text={this.state.commento} />
              </View>
            </FlatCard>
            ): (null)}
          </div>
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

export default Order;
