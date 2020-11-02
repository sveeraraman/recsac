import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MyError = (props) => {
  if (props.errorValue != null) {
    return <View style={{ ...styles.container, ...styles.highlight }}></View>;
  } else {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.errorText}>{props.errorValue}</Text> */}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginBottom: 17,
  },
  errorText: {
    color: "red",
  },
  highlight: {
    marginLeft: 10,
    backgroundColor: "red",
    padding: 0.8,
    width: "100%",
  },
});

export default MyError;
