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
import OrderSmall from "./OrderRestEntry";
import DataProvider from "./../DataProvider";
import { isCompositeComponent } from "react-dom/test-utils";

class RestaurantHome extends React.Component {
  constructor(props) {
    super(props);
    console.debug("RestaurantHome", "constructor");
    this.provider = new DataProvider();
    console.log("Restaurant token", this.provider.token);
    this.state = {
      ordini: []
    };
  }

  componentDidMount() {
    console.debug("RestaurantHome", "componentDidMount");
    this.provider.getAllRestOrders().then(response => {
      console.log(response);
      this.setState({
        ordini: response
      });
    });
  }

  handleOrder(id, tipo) {
    if (tipo) this.provider.getRestOrder(id);
    else this.provider.getRestReservation(id);
  }

  render() {
    return (
      <View>
        <HeaderCard>
          <Title text={"DeliveryFood Ordini"} />
          <View style={styles.userPanel}>
            {!this.provider.isGuest() && (
              <Button
                text={"il tuo profilo 👤"}
                onPress={this.provider.navigateCustomerProfile}
              />
            )}
            {!this.provider.isGuest() && (
              <Button 
                text={"Logout"}
                onPress={this.provider.doLogout}
            />
            )}
          </View>
        </HeaderCard>
        <Card>
          <FlatList
            data={this.state.ordini}
            renderItem={({ item }) => (
              <OrderSmall
                cognome={item.cliente.cognome}
                tipo={item.tipo}
                data={(new Date(item.data).toLocaleDateString())}
                stato={item.stato}
                id={item.id}
                onPressDetails={() => this.handleOrder(item.id, item.tipo)}
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

export default RestaurantHome;
