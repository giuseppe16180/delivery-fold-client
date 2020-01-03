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
import MenuEntry from "./MenuEntry";
import Footer from "./Footer";
import DataProvider from "./../DataProvider";

class RestaurantMenu extends React.Component {
  constructor(props) {
    super(props);
    console.debug("RestaurantMenu", "constructor");
    this.provider = new DataProvider();
    this.state = {
      nome: "Nome",
      indirizzo: "Indirizzo",
      fotoMenu: "",
      descrizione: "Descrizione",
      fotoLocale: "",
      telefono: "Telelfono",
      mediaValutazioni: "Valutazione Media",
      orario: "Orario d'apertura",
      menu: []
    };
  }

  componentDidMount() {
    console.debug("RestaurantMenu", "componentDidMount");
    this.provider.doGetRestaurant().then(response => {
      console.log(response);
      //scarparizia intensifies, perdoname o madre por mi api loca
      const orari = response.ristorante.orario.split("/");
      orari[0] = "Lun " + orari[0] + " ";
      orari[1] = "Mar " + orari[1] + "\n";
      orari[2] = "Mer " + orari[2] + " ";
      orari[3] = "Gio " + orari[3] + "\n";
      orari[4] = "Ven " + orari[4] + " ";
      orari[5] = "Sab " + orari[5] + "\n";
      orari[6] = "Dom " + orari[6] + " ";
      this.setState({
        nome: response.ristorante.nome,
        indirizzo: response.ristorante.indirizzo,
        fotoMenu: response.ristorante.fotoMenu,
        descrizione: response.ristorante.descrizione,
        fotoLocale: response.ristorante.fotoLocale,
        telefono: response.ristorante.telefono,
        orario: orari,
        mediaValutazioni: response.mediaValutazioni,
        menu: response.menu
      });
    });
  }

  handleAddToCart = id => {
    this.provider
      .doAddToCart(id)
      .then(alert("Aggiunto!"))
      .catch(error => alert(error));
  };

  render() {
    console.debug("RestaurantMenu", "render");
    return (
      <View>
        {/*HEADER*/}
        <HeaderCard>
          <Title text={"DeliveryFood Ricerca"} />
          <View style={styles.userPanel}>
            <Button
              text={"Home 🏠"}
              onPress={this.provider.navigateCustomerHome}
            />
            <Button text={"Carrello 🛒"} onPress={this.provider.navigateCart} />
            {!this.provider.isGuest && (
              <Button
                text={"i tuoi ordini 🍔"}
                onPress={this.provider.navigateOrders}
              />
            )}
            {!this.provider.isGuest && (
              <Button
                text={"il tuo profilo 👤"}
                onPress={this.provider.navigateCustomerProfile}
              />
            )}
          </View>
        </HeaderCard>
        {/*BODY*/}
        <Card>
          {/*DETAILS*/}
          <FlatCard>
            <View style={styles.restaurantInfoLeft}>
              <Title text={this.state.nome} />
              <Label text={this.state.indirizzo} />
              <Label text={this.state.descrizione} />
              <Label text={"Tel. " + this.state.telefono} />
            </View>
            <View style={styles.restaurantInfoRight}>
              <VerySmallLabel text={this.state.orario} />
              <View style={styles.rating}>
                <SubTitle
                  text={
                    this.state.mediaValutazioni == null
                      ? "Nessuna Valutazione"
                      : this.state.mediaValutazioni + "★"
                  }
                />
              </View>
            </View>
          </FlatCard>
          <Separator />
          {/*MENU HEADER*/}
          <FlatCard>
            <View style={styles.menuRow}>
              <SubTitle text={"Menu"} />
              <Label text={"Aggiungi al carrello i piatti che desideri"} />
            </View>
          </FlatCard>
          {/*MENU ENTRIES*/}
          <FlatList
            data={this.state.menu}
            renderItem={({ item }) => (
              <MenuEntry
                image={"https://picsum.photos/id/400/400"}
                name={item.nome}
                price={item.prezzo}
                description={item.descrizione}
                onAddToCart={() => this.handleAddToCart(item.id)} //TODO non so se funziona così
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

export default RestaurantMenu;
