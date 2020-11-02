import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import colors from "../constants/colors";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const CustomHeaderButton = (props) => {
  var icon;
  if (props.icontype == "material") {
    icon = MaterialIcons;
  } else if (props.icontype == "fontawesome") {
    icon = FontAwesome;
  } else if (props.icontype == "feather") {
    icon = Feather;
  } else if (props.icontype == "MaterialCommunityIcons") {
    icon = MaterialCommunityIcons;
  } else if (props.icontype == "AntDesign") {
    icon = AntDesign;
  } else {
    icon = Ionicons;
  }

  return (
    <HeaderButton
      {...props}
      IconComponent={icon}
      iconSize={30}
      color={colors.blackIconColor}
    />
  );
};

export default CustomHeaderButton;
