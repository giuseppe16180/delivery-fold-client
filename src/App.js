import React from "react";
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput
} from "react-native";

class App extends React.Component {
  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Hello, world!</Text>
        <Text style={styles.subTitle}>Hello, world!</Text>
        <Text style={styles.text}>Hello, world!</Text>
        <TextInput placeholder={"Password"} style={styles.input}></TextInput>
        <Button
          style={styles.button}
          fontStyle={styles.buttonFont}
          title="Press me"
          onPress={() => console.log("ciao")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: "14px",
    padding: 3,
    borderRadius: 2,
    borderColor: "gray",
    borderWidth: 1
  },
  card: {
    borderRadius: 2,
    padding: 6,
    marginTop: "10%",
    marginLeft: "20%",
    marginRight: "20%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6
  },

  title: {
    fontWeight: "bold",
    fontSize: "26px",
    alignSelf: "center"
  },
  subTitle: { fontWeight: "semi-bold", fontSize: "20px" },
  text: { fontSize: "16px" },
  button: {
    borderRadius: 2,

    alignSelf: "center",
    backgroundColor: "#ff7733",
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  buttonFont: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "black"
  }
});

function Button(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      underlayColor={"white"}
      style={props.style}
      onPress={props.onPress}
    >
      <Text style={props.fontStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
}

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});

export default App;
