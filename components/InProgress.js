import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import colors from "../constants/colors";

const InProgress = (props) => {
  return (
    <View style={styles.centered}>
      <ActivityIndicator
        size="small"
        color={colors.primaryColor}
      ></ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});

export default InProgress;
