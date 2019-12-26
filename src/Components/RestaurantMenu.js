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
import MenuEntry from "./MenuEntry";
import DataProvider from "./../DataProvider";

class RestaurantMenu extends React.Component {
  constructor(props) {
    super(props);
    console.debug("RestaurantMenu", "constructor");
    this.provider = new DataProvider();
    this.state = {
      nome: null,
      indirizzo: null,
      fotoMenu: null,
      descrizione: null,
      fotoLocale: null,
      telelfono: null,
      email: null,
      mediaValutazioni: null,
      menu: []
    };
    this.provider.doGetRestaurant().then(response => {
      this.setState({
        nome: response.nome,
        indirizzo: response.indirizzo,
        fotoMenu: response.fotoMenu,
        descrizione: response.descrizione,
        fotoLocale: response.fotoLocale,
        telelfono: response.telelfono,
        email: response.email,
        mediaValutazioni: response.mediaValutazioni,
        menu: response.menu
      });
    });
  }

  render() {
    console.debug("RestaurantMenu", "render");
    return (
      <View>
        <HeaderCard>
          <Title text={"DeliveryFood: " + this.state.name} />

          <View style={styles.userPanel}>
            <Button text={"i tuoi ordini"} />
            <Button text={"il tuo profilo"} />
          </View>
        </HeaderCard>

        <Card>
          <FlatCard>
            <SubTitle text={"cca ci va a descrizione " + this.description} />
          </FlatCard>
          <Separator />
          <FlatList
            data={this.state.menu}
            renderItem={({ item }) => (
              <MenuEntry
                image={"https://picsum.photos/id/400/400"}
                name={item.nome}
                description={item.prezzo}
                descriptionSmall={item.descrizione}
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

export default RestaurantMenu;
