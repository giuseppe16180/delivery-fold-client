import React from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Card,
  Button,
  SubTitle,
  Label,
  Title,
  Input,
  FlatCard
} from "./delivery-fold-components";
//https://picsum.photos/id/400/400
class RestaurantSmall extends React.Component {
  constructor(props) {
    super(props);
    console.debug("RestaurantSmall", "constructor");
    this.state = {
      restaurantID: null
    };
  }

  handleDetails = () => {
    console.debug("RestaurantSmall", "handleDetails");
  };

  render() {
    return (
      <FlatCard>
        <Image style={styles.image} source={"https://picsum.photos/400"} />
        <View style={{ flex: 2 }}>
          <SubTitle text="asdasdasdasd" />
        </View>
      </FlatCard>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 200
  },
  formRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  submitButton: {
    justifyContent: "flex-end",
    flexDirection: "row"
  }
});

export default RestaurantSmall;
