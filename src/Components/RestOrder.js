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
    console.debug("RestOrder", "constructor");
    this.provider = new DataProvider();
    this.state = {
      id: "id",
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
    console.debug("RestOrder", "componentDidMount");
    this.provider.getRestBookedOrder().then(response => {
      console.log(response);
      this.setState({
        id: response.info.ordine.id,
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

  handleOrder(stato, id, tipo) {
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("tipo", tipo)

    if (stato == "in elaborazione")
      this.provider.doAcceptOrder();
    else if(stato == "accettato dal ristorante")
      this.provider.doShipOrder();
    else if(stato == "in consegna")
      this.provider.doCompleteOrder();
    else
      this.provider.doCancelOrder();
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
              <Label text={new Date(this.state.data).toLocaleDateString()} />
            </View>
            {(this.state.stato == "in elaborazione") ? (
              <View style={styles.buttonRow}>
                <Button text={"Accetta ordine"}  
                onPress={() => this.handleOrder(this.state.stato, this.state.id, this.state.tipo)}/>
              </View>
            ): ((this.state.stato == "accettato dal ristorante") ? (
              <View style={styles.buttonRow}>
                <Button text={"In consegna"}  
                onPress={() => this.handleOrder(this.state.stato, this.state.id, this.state.tipo)}
                />
              </View>
            ): ((this.state.stato == "in consegna") ? (
              <View style={styles.buttonRow}>
                <Button text={"Completato"}  
                onPress={() => this.handleOrder(this.state.stato, this.state.id, this.state.tipo)}
                
                />
              </View>
            ): (null)
            ))}
            {((this.state.stato != "completato") && (this.state.stato != "cancellato")) ? (
              <View style={styles.buttonRow}>
                <Button text={"Cancella"}  
                onPress={() => this.handleOrder("cancellato", this.state.id, this.state.tipo)}
                />
              </View>
            ): (null)
            }
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
