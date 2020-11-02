import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleSheet } from "react-native";
import { AsyncStorage } from "react-native";
import * as cons from "../constants/constantkeys";
import DefaultText from "../components/DefaultText";

const SignupSuccessScreen = ({ navigation }) => {
  const [mobFromCache, setmobFromCache] = useState("");
  const [userFromCache, setuserFromCache] = useState("");

  var domainname = cons.DOMAIN_NAME_PLAIN;
  var dom_email = cons.DOMAIN_NAME_WITH_AT;

  //to retrieve the data whenever the app starts, invoke within useEffect hook
  useEffect(() => {
    _retrieveData();
  }, [userFromCache, mobFromCache]);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert("Storage successfully cleared!");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  const _retrieveData = async () => {
    try {
      const regUserName = await AsyncStorage.getItem(cons.REGISTERED_USERNAME);
      //console.log("regUserName", regUserName);
      const regMobileNumber = await AsyncStorage.getItem(
        cons.REGISTERED_MOBILENUMBER
      );

      if (regUserName !== null) {
        setuserFromCache(regUserName);
      }

      if (regMobileNumber !== null) {
        setmobFromCache(regMobileNumber);
      }
    } catch (error) {
      alert(error);
    }
  };

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <AntDesign name="checkcircleo" size={80} color="green" />
        <Text style={{ fontSize: 23, marginTop: 20, fontWeight: "bold" }}>
          You're all set!
        </Text>
        <View style={{ alignContent: "center", borderWidth: 0 }}>
          <Text style={styles.subtitle}>
            You can now use your {domainname} account for receiving short lived,
            self cleanable, throw away email messages.
          </Text>
        </View>
        {/* 
      <Text style={{ fontSize: 20, marginTop: 20, textAlign: "center" }}>
        No more hassle of junk messages to your inbox. Keep your personal email
        ids safe and secure!
      </Text> */}

        <Text style={{ fontSize: 20, marginTop: 20, textAlign: "center" }}>
          You can choose to use either your mobile number or username as your
          email id
        </Text>

        <Text style={{ fontSize: 16, marginTop: 10 }}>For instance,</Text>
        <View style={styles.helpcontent}>
          <View>
            <DefaultText>
              {mobFromCache}.coupons{dom_email}
            </DefaultText>
          </View>
          <View>
            <DefaultText>
              {userFromCache}.receipts{dom_email}
            </DefaultText>
          </View>
        </View>

        <View style={{ paddingTop: 10, fontSize: 16 }}>
          <DefaultText>Pretty much for anything you want!</DefaultText>
        </View>

        <View style={styles.helpcontent2}>
          <View style={styles.helpcontent}>
            <View>
              <DefaultText>username.anykey{dom_email} or</DefaultText>
            </View>
            <View>
              <DefaultText> your-mobilenumber.anykey{dom_email}</DefaultText>
            </View>
          </View>
        </View>

        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Get started now!{"  "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

SignupSuccessScreen.navigationOptions = {
  headerTitle: "",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 50,
    marginTop: 20,
    padding: 20,
  },
  title: {},
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 0,
    fontSize: 20,
    paddingRight: 0,
    justifyContent: "center",
    paddingTop: 20,
    lineHeight: 30,
    textAlign: "center", // <-- the magic
  },
  helpcontent: {
    flexDirection: "column",
    overflow: "hidden",
    borderWidth: 0,
    fontSize: 16,
    justifyContent: "center",
    textAlign: "center", // <-- the magic
    paddingTop: 10,
  },
  helpcontent2: {
    lineHeight: 30,
    textAlign: "center", // <-- the magic
    flexDirection: "column",
    overflow: "hidden",
    borderWidth: 0,
    fontSize: 16,
    justifyContent: "center",
    paddingTop: 10,
  },
});

export default SignupSuccessScreen;
