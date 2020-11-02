import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import colors from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import DefaultText from "./DefaultText";

const Separator = () => {
  return <View style={styles.topbar}></View>;
};

const CustomModal = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => props.onRequestClose()}
    >
      <TouchableWithoutFeedback onPress={() => props.outsideClick()}>
        <View style={styles.modalView}>
          <View style={styles.roundedtop}>
            <View style={styles.topbarcont}>
              <Separator></Separator>
            </View>
            <View>
              <View style={styles.headerbar}>
                <View style={styles.texthead}>
                  <DefaultText size={17}>{props.title}</DefaultText>
                </View>
                <TouchableHighlight
                  onPress={() => {
                    props.onSave();
                  }}
                  style={{ paddingRight: 25 }}
                >
                  <View>
                    <AntDesign name="check" size={24} color="black" />
                  </View>
                </TouchableHighlight>

                <TouchableHighlight
                  onPress={() => {
                    props.onCancel();
                  }}
                >
                  <View>
                    <AntDesign name="close" size={24} color="black" />
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
          <View style={styles.overlaycontent}>
            <View style={styles.overlaycontentInner}>{props.children}</View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 10,
    borderWidth: 0,
  },
  headerbar: {
    borderWidth: 0.25,
    borderColor: colors.borderColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    padding: 5,
    width: "100%",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  overlaycontent: {
    backgroundColor: "#fff",
    borderWidth: 0,
    borderColor: colors.borderColor,
    //paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    opacity: 1,
    width: "100%",
  },
  overlaycontentInner: {
    padding: 10,
    paddingBottom: 60,
  },
  modalView: {
    //elevation: 5,
    flex: 1,
    //flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    //elevation: 2,
    opacity: 1,
    backgroundColor: "#00000080",
    borderWidth: 0,
  },
  texthead: {
    borderWidth: 0,
    justifyContent: "flex-start",
    flex: 1,
    paddingLeft: 5,
  },
  topbar: {
    borderWidth: 0.25,
    borderColor: colors.borderColor,
    height: 5,
    width: "20%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  roundedtop: {
    paddingTop: 5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "#fff",
  },
  topbarcont: {
    alignItems: "center",
  },
});

export default CustomModal;
