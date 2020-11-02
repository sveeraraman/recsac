import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet } from "react-native";
import colors from "../constants/colors";

const FormButton = ({ title, buttonType, buttonColor, onClick, ...rest }) => {
  return (
    <Button
      {...rest}
      type={buttonType}
      title={title}
      buttonStyle={styles.button}
      titleStyle={styles.buttonTitle}
      onPress={onClick}
    />
  );
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

export default FormButton;
