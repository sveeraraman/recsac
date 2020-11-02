import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

const BoldText = (props) => {
  return (
    <Text style={{ ...styles.textstyle, ...{ fontSize: props.size } }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textstyle: {
    fontFamily: "open-sans-bold",
    justifyContent: "flex-start",
    color: colors.fontDefColor,
  },
});

export default BoldText;
