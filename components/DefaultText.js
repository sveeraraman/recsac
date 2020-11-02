import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

const DefaultText = (props) => {
  const overrideSize = props.size > 0 ? props.size : colors.defaultFontSize;
  var itemStyle;
  if (props.itemStyle != null) {
    itemStyle = { ...styles.textstyle, ...props.itemStyle };
  } else {
    itemStyle = { ...styles.textstyle, ...{ fontSize: overrideSize } };
  }
  return <Text style={itemStyle}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  textstyle: {
    fontFamily: "open-sans",
    justifyContent: "flex-start",
    color: colors.fontDefColor,
  },
});

export default DefaultText;
