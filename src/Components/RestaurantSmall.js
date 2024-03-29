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
  SmallLabel,
  VerySmallLabel
} from "./delivery-fold-components";
//https://picsum.photos/400
function RestaurantSmall(props) {
  return (
    <FlatCard>
      <Image style={styles.image} source={props.image} />
      <View style={styles.content}>
        <SubTitle text={props.name} />
        <Label text={props.description} />
        <VerySmallLabel text={props.descriptionSmall} />
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

export default RestaurantSmall;
