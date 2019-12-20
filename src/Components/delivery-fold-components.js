import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput
} from "react-native";

export function Card(props) {
  return <View style={styles.card}>{props.children}</View>;
}

export function FlatCard(props) {
  return <View style={styles.flatCard}>{props.children}</View>;
}

export function Title(props) {
  return <Text style={styles.title}>{props.text}</Text>;
}

export function SubTitle(props) {
  return <Text style={styles.subTitle}>{props.text}</Text>;
}

export function Label(props) {
  return <Text style={styles.label}>{props.text}</Text>;
}

export function Input(props) {
  return (
    <TextInput
      value={props.value}
      placeholder={props.placeholder}
      onChangeText={props.onChange}
      style={styles.input}
      secureTextEntry={props.hide}
    />
  );
}

function ButtonFactory(props) {
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

export function Button(props) {
  return (
    <ButtonFactory
      style={styles.button}
      fontStyle={styles.buttonFont}
      title={props.text}
      onPress={props.onPress}
    />
  );
}

export function Separator() {
  return <View style={styles.separator}></View>;
}

const styles = StyleSheet.create({
  separator: {
    flexDirection: "column",
    borderRadius: 3,
    height: 2,
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 6,
    marginRight: 6,

    backgroundColor: "#aaaaaa",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6
  },
  input: {
    fontSize: "14px",
    padding: 3,
    borderRadius: 2,
    borderColor: "gray",
    borderWidth: 1,
    margin: 6
  },
  card: {
    flexDirection: "column",
    borderRadius: 2,
    padding: 6,
    marginTop: 24,
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

  flatCard: {
    margin: 6,
    flexDirection: "row",
    borderRadius: 0,
    padding: 6,
    borderRadius: 2,
    borderColor: "#aaaaaa",
    borderWidth: 1,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 0
  },

  title: {
    fontWeight: "bold",
    fontSize: "26px",
    margin: 6
  },
  subTitle: { fontWeight: "semi-bold", fontSize: "20px", margin: 6 },
  label: { fontSize: "14px", margin: 6 },
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
    shadowOpacity: 0.2,
    shadowRadius: 2.5,

    elevation: 3,
    margin: 6
  },
  buttonFont: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "black"
  }
});
