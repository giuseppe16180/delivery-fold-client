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
  FooterCard,
  SmallLabel,
  VerySmallLabel
} from "./delivery-fold-components";
import MenuEntry from "./MenuEntry";
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
      const orari = response.ristorante.orario.split("/");
      orari[0] = "Lun " + orari[0] + "     ";
      orari[1] = "Mar " + orari[1] + "\n";
      orari[2] = "Mer " + orari[2] + "     ";
      orari[3] = "Gio " + orari[3] + "\n";
      orari[4] = "Ven " + orari[4] + "     ";
      orari[5] = "Sab " + orari[5] + "\n";
      orari[6] = "Dom " + orari[6] + "     ";
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

  render() {
    console.debug("RestaurantMenu", "render");
    return (
      <View>
        <Card>
          <FlatCard>
            <View style={styles.restaurantInfo}>
              <Title text={this.state.nome} />
              <Label text={this.state.indirizzo} />
              <Label text={this.state.descrizione} />
              <Label
                text={
                  "Email: " +
                  this.state.descrizione +
                  " - Tel. " +
                  this.state.telefono
                }
              />
              <VerySmallLabel text={this.state.orario} />
            </View>
          </FlatCard>
          <Separator />
          <FlatCard>
            <View style={styles.suggestionsRow}>
              <SubTitle text={"Menu"} />
              <Label text={"Aggiungi al carrello i piatti che desideri"} />
            </View>
          </FlatCard>
          <FlatList
            data={this.state.menu}
            renderItem={({ item }) => (
              <MenuEntry
                image={"https://picsum.photos/id/400/400"}
                name={item.nome}
                price={item.prezzo}
                description={item.descrizione}
                onAddToCart={() => this.provider.doAddToCart(item.id)} //TODO non so se funziona così
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
  restaurantInfo: {
    flexDirection: "column"
  },

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

export default RestaurantMenu;
