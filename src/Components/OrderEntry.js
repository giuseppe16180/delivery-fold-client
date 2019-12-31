import React from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Card,
  Button,
  SubTitle,
  Label,
  Title,
  Input,
  FlatCard,
  SmallLabel
} from "./delivery-fold-components";

function OrderEntry(props) {
  return (
    <FlatCard>
      <View style={styles.content}>
        <SubTitle text={props.nome} />
        <Label text={props.data} />
        <SmallLabel text={props.stato} />
        <View style={styles.buttonRow}>
          <Button text={"Dettagli"} onPress={props.onPressDetails} />
        </View>
      </View>
    </FlatCard>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  content: {
    flex: 3,
    justifyContent: "space-between"
  },
  image: {
    flex: 2,
    marginRight: 12,
    height: 150
  }
});

export default OrderEntry;