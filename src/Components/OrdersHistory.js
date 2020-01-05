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
import OrderSmall from "./OrderEntry";
import DataProvider from "./../DataProvider";

class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
    console.debug("OrderHistory", "constructor");
    this.provider = new DataProvider();
    console.log("customer token", this.provider.token);
    this.state = {
      ordini: []
    };
  }

  componentDidMount() {
    console.debug("OrdersHistory", "componentDidMount");
    this.provider.getAllOrders().then(response => {
      console.log(response);
      this.setState({
        ordini: response
      });
    });
  }

  handleOrder(id, tipo) {
    if (tipo) this.provider.getOrder(id);
    else this.provider.getReservation(id);
  }

  render() {
    return (
      <View>
        <HeaderCard>
          <Title text={"DeliveryFood Ordini"} />
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
          </View>
        </HeaderCard>
        <Card>
          <FlatList
            data={this.state.ordini}
            renderItem={({ item }) => (
              <OrderSmall
                ristoranti={item.ristoranti}
                tipo={item.ordine.tipo}
                data={(new Date(item.ordine.data).toLocaleDateString())}
                stato={item.ordine.stato}
                onPressDetails={() => this.handleOrder(item.ordine.id, item.ordine.tipo)}
              />
            )}
            keyExtractor={item => item.ordine.id}
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

export default OrderHistory;
