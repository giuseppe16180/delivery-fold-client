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
import CartEntry from "./CartEntry";
import DataProvider from "./../DataProvider";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    console.debug("Cart", "constructor");
    this.provider = new DataProvider();
    this.state = {
      total: "0.00",
      entries: []
    };
  }

  componentDidMount() {
    console.debug("Cart", "componentDidMount");
  }

  render() {
    console.debug("Cart", "render");
    return (
      <View>
        <HeaderCard>
          <Title text={"DeliveryFood Carrello"} />
          <View style={styles.userPanel}>
            <Button text={"Home 🏠"} />
            <Button text={"i tuoi ordini 🍔"} />
            <Button text={"il tuo profilo 👤"} />
          </View>
        </HeaderCard>

        <Card>
          <FlatCard>
            <View style={styles.searchRow}>
              <View style={styles.suggestionsRow}>
                <SubTitle text={"Procedi all'ordine!"} />
                <Label text={"Totale " + this.state.total + "€"} />
              </View>
              <Button
                text={"check out"}
                onPress={this.provider.navigateCheckOut}
              />
            </View>
          </FlatCard>
          <Separator />

          <FlatList
            data={this.state.menu}
            renderItem={({ item }) => (
              <CartEntry
                image={item.image /* i nomi di sta cosa dipendono da bicè */}
                name={item.name}
                price={item.price}
                count={item.count}
                onRemove={() => {}}
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

export default Cart;
