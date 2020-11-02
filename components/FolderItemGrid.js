import React, { useState } from "react";
import { View, StyleSheet, Platform, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";
import colors from "../constants/colors";
import BoldText from "./BoldText";
import DefaultText from "./DefaultText";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { AntDesign } from "@expo/vector-icons";

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  return (
    <View style={styles.leftAction}>
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        Add to Cart
      </Animated.Text>
    </View>
  );
};

const RightActions = ({ progress, dragX, onPress, val, counterChange }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  return (
    // <View style={styles.rightAction}>
    //   <View style={{ borderWidth: 0, flex: 1, paddingTop: 10 }}>
    //     <TouchableOpacity>
    //       <Ionicons name="ios-arrow-up" size={24} color="black" />
    //     </TouchableOpacity>
    //   </View>
    //   <View style={{ borderWidth: 0, flex: 1, paddingTop: 24 }}>
    //     <TouchableOpacity>
    //       <Ionicons name="ios-arrow-down" size={24} color="black" />
    //     </TouchableOpacity>
    //   </View>
    // </View>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rightAction}>
        <View style={{ paddingTop: 20, borderWidth: 0 }}>
          <AntDesign name="switcher" size={24} color="#fff" />
        </View>
        <View
          style={{
            borderWidth: 0,
            flex: 1,
          }}
        >
          <Animated.Text
            style={[styles.actionText, { transform: [{ scale }] }]}
          >
            Extend Storage
          </Animated.Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FolderItemGrid = (props) => {
  let Touchablecomp = TouchableOpacity;
  const [countervalue, setcountervalue] = useState(2);

  if (Platform.OS == "android" && Platform.Version >= 21) {
    Touchablecomp = TouchableNativeFeedback;
  }
  var subject =
    props.subject && props.subject.length > 90
      ? props.subject.substring(0, 90) + "..."
      : props.subject;
  return (
    <Swipeable
      // renderLeftActions={LeftActions}
      // onSwipeableLeftOpen={props.onSwipeFromLeft}
      renderRightActions={(progress, dragX) => (
        <RightActions
          progress={progress}
          dragX={dragX}
          onPress={props.onRightPress}
          val={countervalue}
          counterChange={setcountervalue}
        />
      )}
    >
      <View style={styles.gridcontainer}>
        <View style={styles.rowContainer}>
          <Touchablecomp style={styles.grid} onPress={props.onSelect}>
            <View style={styles.itemheader}>
              <View>
                <BoldText size={16}>{props.from}</BoldText>
              </View>
              <View>
                <DefaultText size={10}>{props.receivedDate}</DefaultText>
              </View>
            </View>
            <View style={styles.container}>
              <View>
                <DefaultText size={15}>{subject}</DefaultText>
              </View>
              <View>
                <DefaultText size={12}>{props.snippet}</DefaultText>
              </View>
            </View>
            <View style={styles.itemfooter}>
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="delete-empty-outline"
                  size={21}
                  color={colors.bodyTextColor}
                />
                <DefaultText size={12}>{props.expiry} days</DefaultText>

                <View style={styles.footerlast}>
                  <DefaultText size={12}>{props.ttlDeleteAt}</DefaultText>
                </View>
              </View>

              {props.hasattachment > 0 && (
                <View style={{ flexDirection: "row", borderWidth: 0 }}>
                  <Ionicons name="ios-attach" size={24} color="black" />
                </View>
              )}
            </View>
          </Touchablecomp>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  gridcontainer: {
    flexDirection: "column",
    flex: 1,
  },
  rowContainer: {
    //backgroundColor: "#FFF",
  },
  itemheader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingLeft: 15,
    paddingTop: 10,
    //backgroundColor: "#FFFFFF",
  },
  itemfooter: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingLeft: 15,
    //backgroundColor: "#FFFFFF",
    overflow: "hidden",
    opacity: 100,
    borderWidth: 0,
  },

  grid: {
    //flex: 1,
    height: 110,
    justifyContent: "center",
    borderColor: "#D6D6D3",
    borderWidth: 0.75,
    //borderTopWidth: 0,
    // borderBottomWidth: 0.25,
    //shadowColor: "black",
    //shadowOpacity: 0.75,
    //shadowOffset: { width: 0, height: 2 },
    //shadowRadius: 18,
    // elevation: 1,
    borderRadius: 12,
    marginBottom: 0,
    paddingBottom: 8,
    margin: 5,
    backgroundColor: "#FFFFFF",
  },
  subject: {
    fontSize: 25,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingLeft: 15,
    // height: 60,
  },
  textstyle: {
    fontFamily: "open-sans-bold",
    fontSize: 15,
    justifyContent: "center",
    color: colors.bodyTextColor,
  },
  leftAction: {
    backgroundColor: "#388e3c",
    justifyContent: "center",
    flex: 1,
  },
  rightAction: {
    backgroundColor: colors.buttonColor,
    borderColor: "#D6D6D3",
    borderWidth: 0.75,
    borderRadius: 12,
    marginBottom: 0,
    margin: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 110,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
  },
  actionsubText: {
    color: "#fff",
    fontWeight: "300",
    paddingRight: 20,
  },
  footerlast: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderWidth: 0,
    width: "100%",
    flex: 1,
    paddingLeft: 10,
  },
});

const icons = {
  rightarrow: "right",
};

export default FolderItemGrid;
