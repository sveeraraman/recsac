import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import colors from "../constants/colors";

const MyButton = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onClick}>
      <Text style={styles.buttonTitle}>{props.text}</Text>
    </TouchableOpacity>
  );
};

MyButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.buttonColor,
    // marginLeft: 30,
    // marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 0,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MyButton;
