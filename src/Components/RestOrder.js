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

class RestOrder extends React.Component {
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
    this.provider.getRestBookedOrder().then(response => {
      console.log(response);
      this.setState({
        id: response.info.ordine.id,
        ristoranti: response.ristoranti,
        nome: response.info.ordine.cliente.nome,
        cognome: response.info.ordine.cliente.cognome,
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
              onPress={this.provider.navigateRestaurantHome}
            />
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
                text={"Ordine a domicilio, codice " + this.state.id}/>
              <SubTitle text={"Tempo Consegna " + this.state.tempo_consegna} />
              <SubTitle style={{  width: "100%" }}
                text={"Indirizzo di consegna: " + this.state.indirizzo}
              />
              <SubTitle
                text={"Consegnare a: " + this.state.nome + " " + this.state.cognome}
              />
              <SubTitle text={"Totale " + this.state.totale + "€"} />
              <Label text={this.state.stato} />
              <Label text={"Tel. " + this.state.telefono} />
            </View>




            
            <View style={styles.buttonRow}>
              <Button text={"In elaborazione"}  />
            </View>
            <View style={styles.buttonRow}>
              <Button text={"In consegna"}  />
            </View>
            <View style={styles.buttonRow}>
              <Button text={"Completato"}  />
            </View>
            <View style={styles.buttonRow}>
              <Button text={"Cancella"}  />
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

  buttonRow: {
    flexDirection: "Column",
    justifyContent: "flex-end",
  
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

export default RestOrder;
