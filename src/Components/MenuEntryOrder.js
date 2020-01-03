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
//https://picsum.photos/id/400/400
function MenuEntryOrder(props) {
  return (
    <FlatCard>
      <Image style={styles.image} source={props.image} />
      <View style={styles.content}>
        <SubTitle text={props.name} />
        <Label text={props.price + "€"} />
        <SmallLabel text={props.description} />
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

export default MenuEntryOrder;
