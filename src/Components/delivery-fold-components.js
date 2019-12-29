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

export function HeaderCard(props) {
  return <View style={styles.headerCard}>{props.children}</View>;
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

export function SmallLabel(props) {
  return <Text style={styles.smallLabel}>{props.text}</Text>;
}

export function VerySmallLabel(props) {
  return <Text style={styles.verySmallLabel}>{props.text}</Text>;
}

export function FooterCard(props) {
  return <View style={styles.footerCard}>{props.children}</View>;
}

export function Input(props) {
  return (
    <TextInput
      value={props.value}
      placeholder={props.placeholder}
      onChangeText={props.onChange}
      onFocus={props.onPress}
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

export function Separator(props) {
  console.log("times", props.times);
  return (
    <View
      style={{ marginTop: 18 * (props.times == undefined ? 1 : props.times) }}
    ></View>
  );
}

const styles = StyleSheet.create({
  verySmallLabel: {
    color: "gray",
    fontWeight: "200",
    fontSize: "10px",
    margin: 6,
    textAlign: "center"
  },
  headerCard: {
    paddingLeft: 24,
    paddingRight: 24,
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 12
  },

  footerCard: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    padding: 6,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 12
  },
  flatCard: {
    margin: 6,
    flexDirection: "row",
    padding: 6,
    borderColor: "#aaaaaa",
    borderWidth: 1,
    borderRadius: 2,
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
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6
  },

  title: {
    fontWeight: "bold",
    fontSize: "26px",
    margin: 6
  },
  subTitle: { fontWeight: "bold", fontSize: "20px", margin: 6 },
  label: { fontWeight: "600", fontSize: "14px", margin: 6 },
  smallLabel: {
    fontWeight: "400",
    fontSize: "12px",
    margin: 6
  },
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
