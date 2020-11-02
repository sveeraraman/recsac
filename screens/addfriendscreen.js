import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import * as action from "../store/actions/friends";
import { View, Text, StyleSheet, Button, Platform } from "react-native";
import {
  FlatList,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { RadioButton } from "react-native-paper";
import InProgress from "../components/InProgress";

const AddFriendScreen = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [error, setError] = useState();
  const [username, setusername] = useState();
  const [contacts, setcontacts] = useState([]);
  const [checkallstatus, setcheckallstatus] = useState(true);
  const dispatch = useDispatch();
  var tolist = props.navigation.getParam("inviteFriendsList");
  let Touchablecomp = TouchableOpacity;

  if (Platform.OS == "android" && Platform.Version >= 21) {
    Touchablecomp = TouchableNativeFeedback;
  }

  useEffect(() => {
    (async () => {
      var _contacts = [];
      try {
        setisLoading(true);
        setisRefreshing(true);

        const {
          status,
        } = await Contacts.requestPermissionsAsync().catch((e) => {});

        if (status === "granted") {
          var { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
          });

          //data = contacts_dummy;

          if (Platform.OS == "android") {
            for (let index = 0; index < data.length; index++) {
              const contact = data[index];
              var fr_ph =
                contact.phoneNumbers != null &&
                contact.phoneNumbers.length > 0 &&
                contact.phoneNumbers[0].number != null
                  ? contact.phoneNumbers[0].number.replace("+", "")
                  : null;
              // console.log(contact);
              if (contact.emails != null) {
                _contacts.push({
                  email: contact.emails[0].email,
                  firstName: contact.firstName,
                  lastName: contact.lastName,
                  value: "checked",
                  phonenumber: fr_ph,
                });
              }
            }
          } else {
            for (let index = 0; index < data.length; index++) {
              const contact = data[index];
              var fr_ph =
                contact.phoneNumbers != null && contact.phoneNumbers.length > 0
                  ? contact.phoneNumbers[0].digits.replace("+", "")
                  : null;
              // console.log(contact);
              if (contact.emails != null) {
                _contacts.push({
                  email: contact.emails[0].email,
                  firstName: contact.firstName,
                  lastName: contact.lastName,
                  value: "checked",
                  phonenumber: fr_ph,
                });
              }
            }
          }
          setcontacts(_contacts);
          setisLoading(false);
          setisRefreshing(false);
        }
      } catch (error) {
        //console.log(error);
        setcontacts(_contacts);
        setisLoading(false);
        setisRefreshing(false);
      }
    })();
  }, []);

  useEffect(() => {
    var selclist = contacts.filter((m) => m.value == "checked");
    props.navigation.setParams({ sendInvite: sendInvitation });
    props.navigation.setParams({ selslist: selclist });
    return function cleanup() {};
  }, [sendInvitation, contacts]);

  const sendInvitation = () => {
    try {
      var selectedList = contacts.filter((m) => m.value === "checked");
      //console.log(selectedList);
      if (selectedList != null && selectedList.length > 0) {
        selectedList.forEach((m) => (m.value = "Pending Registration"));
        dispatch(action.sendInvitation(selectedList));
        props.navigation.goBack();
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const setChecked = (_email) => {
    var tempcontacts = [...contacts];
    var objIndex = tempcontacts.findIndex((m) => m.email == _email);
    var selectedItem = tempcontacts[objIndex];

    if (selectedItem != null) {
      selectedItem.value =
        selectedItem.value == "checked" ? "unchecked" : "checked";
    }
    setcontacts(tempcontacts);
  };

  const isChecked = (_email) => {
    var filteredContact = contacts.filter((m) => m.email == _email);
    var selStatus = "unchecked";
    if (filteredContact != null) {
      filteredContact = filteredContact[0];
      if (filteredContact) {
        var selStatus =
          filteredContact.value == "checked" ? "checked" : "unchecked";
      }
    }
    return selStatus;
  };

  const checkuncheckall = () => {
    var tempcontacts = [...contacts];
    if (checkallstatus) {
      tempcontacts.forEach((m) => (m.value = "unchecked"));
    } else {
      tempcontacts.forEach((m) => (m.value = "checked"));
    }
    setcontacts(tempcontacts);
    checkallstatus ? setcheckallstatus(false) : setcheckallstatus(true);
  };

  const renderContactEmail = (itemData) => {
    return (
      <View style={styles.listrow}>
        <View style={styles.icon}>
          <FontAwesome5 name="user" size={24} color="black" />
        </View>
        <View style={styles.listrowitem}>
          <Touchablecomp onPress={() => setChecked(itemData.item.email)}>
            <View style={styles.nameitem}>
              <View style={styles.textdisplay}>
                <Text style={styles.listTextbig}>
                  {itemData.item.firstName} {itemData.item.lastName}
                </Text>
                <Text style={styles.listText}>{itemData.item.email}</Text>
                <Text style={styles.listText}>{itemData.item.phonenumber}</Text>
              </View>
              <View style={styles.radiocontainer}>
                <RadioButton
                  value={itemData.item.email}
                  status={isChecked(itemData.item.email)}
                />
              </View>
            </View>
          </Touchablecomp>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return <InProgress />;
  }
  var textval = checkallstatus ? "Deselect All" : "Select All";

  return (
    <View style={styles.screen}>
      <Touchablecomp onPress={() => checkuncheckall()}>
        <View style={styles.headerrow}>
          <Text style={styles.headerpath}>{textval}</Text>
        </View>
      </Touchablecomp>

      <FlatList
        refreshing={isRefreshing}
        data={contacts}
        renderItem={renderContactEmail}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
      ></FlatList>
    </View>
  );
};

AddFriendScreen.navigationOptions = (navdata) => {
  const sendInvite = navdata.navigation.getParam("sendInvite");
  const selslist = navdata.navigation.getParam("selslist");
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          icontype="fontawesome"
          title="Send Invite"
          iconName="send-o"
          onPress={sendInvite}
        ></Item>
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    //flex: 1,
    paddingBottom: 20,
  },

  listrow: {
    flex: 1,
    flexDirection: "row",
    marginTop: 2,
    paddingLeft: 20,
    paddingTop: 5,
    backgroundColor: "#FFFFFF",
  },
  listrowitem: {
    borderWidth: 0,
    flex: 1,
  },
  listText: {
    fontSize: 12,
    lineHeight: 20,
  },
  listTextbig: {
    fontSize: 15,
  },
  listTextsub: {
    fontSize: 12,
  },
  flatlistitem: {
    borderWidth: 0,
    flex: 2,
  },
  icon: {
    paddingRight: 20,
  },
  nameitem: {
    flex: 1,
    flexDirection: "row",
    paddingRight: 10,
    borderWidth: 0,
  },
  textdisplay: {
    flex: 1,
    borderWidth: 0,
  },
  headerpath: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    //paddingRight: 15,
    //paddingBottom: 10,
  },
  radiocontainer: {
    //borderColor: "red",
    //borderWidth: 1,
    //height: 30,
    //width: 30,
    // alignItems: "center",
    // justifyContent: "center",
  },
  headerrow: {
    borderWidth: 0,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 10,
  },
});

export default AddFriendScreen;
