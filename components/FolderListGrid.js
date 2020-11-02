import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";
import colors from "../constants/colors";
import BoldText from "./BoldText";
import DefaultText from "./DefaultText";
import { FontAwesome } from "@expo/vector-icons";

const FolderListGrid = (props) => {
  let Touchablecomp = TouchableOpacity;
  if (Platform.OS == "android" && Platform.Version >= 21) {
    Touchablecomp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.gridcontainer}>
      <Touchablecomp style={styles.grid} onPress={props.onSelect}>
        <View style={styles.container}>
          <View
            style={{
              borderColor: "green",
              borderWidth: 0,
              flex: 1,
              flexDirection: "row",
            }}
          >
            <View style={{ flexDirection: "row", paddingRight: 10 }}>
              {/* <AntDesign name="folder" size={30} color={colors.primaryColor} /> */}
              <FontAwesome name="folder" size={24} color={colors.iconColor} />
            </View>

            <BoldText size={18}>{props.title}</BoldText>

            <View
              style={{
                flex: 6,
                justifyContent: "flex-end",
                borderWidth: 0,
                alignItems: "flex-end",
                borderColor: "red",
                marginBottom: 4,
              }}
            >
              <DefaultText>{props.count}</DefaultText>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                borderWidth: 0,
                alignItems: "flex-end",
                borderColor: "#dddddd",
                paddingRight: 5,
              }}
            >
              <AntDesign
                name={icons.rightarrow}
                size={24}
                color={colors.bodyTextColor}
              />
            </View>
          </View>

          <View
            style={{
              borderColor: "red",
              borderWidth: 0,
              flexDirection: "row",
              marginTop: 1,
              overflow: "hidden",
            }}
          >
            <View style={styles.footer}>
              <View style={{ justifyContent: "flex-end" }}>
                <MaterialCommunityIcons
                  name="delete-empty-outline"
                  size={20}
                  color={colors.bodyTextColor}
                />
              </View>
              <View style={{ justifyContent: "flex-start", flex: 1 }}>
                <DefaultText size={11}>{props.policy}</DefaultText>
              </View>
              {/* <View style={{ flex: 0, paddingRight: 10 }}>
                <AntDesign name="setting" size={20} color="black" />
              </View> */}
            </View>
          </View>
        </View>
      </Touchablecomp>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderWidth: 0,
    width: "100%",
    alignContent: "flex-end",
    paddingBottom: 5,
  },
  gridcontainer: {
    flexDirection: "column",
    flex: 1,
    borderWidth: 0,
    backgroundColor: colors.backgroundColor,
  },
  grid: {
    flex: 1,
    height: 80,
    justifyContent: "center",
    borderColor: colors.borderColor,
    borderWidth: 0,
    borderRadius: 0,
    overflow: "hidden",
    borderTopWidth: 0,
    marginTop: 2,
    //backgroundColor: "red",
    //paddingBottom: 0,
  },
  container: {
    flex: 1,
    //borderRadius: 30,
    //shadowColor: "black",
    //shadowOpacity: 0.75,
    //shadowOffset: { width: 0, height: 2 },
    //shadowRadius: 18,
    // elevation: 1,
    paddingLeft: 15,
    paddingRight: 12,
    paddingBottom: 0,
    paddingTop: 12,
    //    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
    //color: "#f0f0f0",
    //borderWidth: 1,
    justifyContent: "center",
    //borderColor: "#D6D6D3",
    //borderWidth: 0.75,
    //borderTopWidth: 0,
    // borderBottomWidth: 0.25,
    //shadowColor: "black",
    //shadowOpacity: 0.75,
    //shadowOffset: { width: 0, height: 2 },
    //shadowRadius: 18,
    // elevation: 1,
    borderRadius: 12,
    marginBottom: 0,
    //paddingBottom: 8,
    //margin: 5,
    //backgroundColor: "#FFFFFF",
  },

  textstyle: {
    fontFamily: "open-sans-bold",
    fontSize: 15,
    justifyContent: "center",
    color: colors.bodyTextColor,
  },
});

const icons = {
  rightarrow: "right",
};

export default FolderListGrid;
