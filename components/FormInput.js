import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import colors from "../constants/colors";

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  value,
  itemStyle,
  ...rest
}) => {
  var itemStyle = itemStyle == undefined ? styles.input : itemStyle;
  return (
    // <View style={styles.inputContainer}>
    <TextInput
      {...rest}
      leftIcon={<Ionicons name={iconName} size={24} color={iconColor} />}
      leftIconContainerStyle={styles.iconStyle}
      placeholderTextColor="gray"
      name={name}
      value={value}
      placeholder={placeholder}
      style={itemStyle}
      keyboardType={keyboardType}
    />
    // </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 0,
    borderColor: "red",
    flexDirection: "row",
  },
  iconStyle: {
    marginRight: 10,
  },
  input: {
    overflow: "hidden",
    marginTop: 2,
    // marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    borderBottomWidth: colors.borderwidth,
    borderBottomColor: colors.borderColor,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingBottom: 10,
    width: "100%",
    color: colors.fontDefColor,
  },
});

export default FormInput;
