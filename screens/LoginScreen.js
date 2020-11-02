import React, { useState, useEffect, Fragment, useRef } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, Provider } from "react-redux";
import { StyleSheet } from "react-native";
import colors from "../constants/colors";

import reducersCombined from "../store/reducers/rootreducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as authActions from "../store/actions/auth";
import { Formik } from "formik";
import FormInput from "../components/FormInput";
import * as Yup from "yup";
import * as services from "../store/actions/service";
import MyError from "../components/ErrorMessage";

const store = createStore(reducersCombined, applyMiddleware(thunk));

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .label("Username")
    .required()
    .min(5, "Must have at least 5 characters"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(8, "Password must have more than 8 characters "),
});

const LoginScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // const _storeData = async (key, value) => {
  //   try {
  //     await AsyncStorage.setItem(key, value);
  //   } catch (error) {
  //     Alert.alert(error.message);
  //   }
  // };

  useEffect(() => {
    if (error) {
      var msgtodisplay = error;
      if (error.includes("attempts exceeded")) {
        msgtodisplay = msgtodisplay + ".  Please try again later.";
      }
      Alert.alert("Error", msgtodisplay, [{ text: "Ok" }]);
    }
  }, [error]);

  // useEffect(() => {
  //   if (isAuth) {
  //     navigation.navigate("Home");
  //   }
  //   return () => {
  //     //do nothing
  //   };
  // }, [isAuth, navigation]);

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const onLoginPress = async (signinValues) => {
    let action;
    var response;
    action = authActions.signIn(signinValues.username, signinValues.password);
    setError(null);
    setisLoading(true);
    try {
      response = await dispatch(action);
      //console.log("loginresult", response);
      if (response.statusCode === services.SUCCESS_STATUS_CODE) {
        navigation.navigate("Home");
      } else {
        if (response.statusCode === services.FAILURE_STATUS_CODE) {
          setError(response.errorMessage);
        }
      }
      setisLoading(false);
    } catch (error) {
      console.log("Myerror", JSON.stringify(error));
      setError(error.errorMessage);
      setisLoading(false);
    }
  };

  return (
    <View style={{ ...styles.container, backgroundColor: "#f5f5f5" }}>
      <KeyboardAwareScrollView
        style={{ width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../assets/images/icon.png")}
        />
        <View style={styles.inputpop}>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              onLoginPress(values);
            }}
          >
            {({
              handleChange,
              values,
              handleSubmit,
              errors,
              isValid,
              touched,
              handleBlur,
              isSubmitting,
            }) => (
              <Fragment>
                <View
                  style={{
                    borderWidth: 0,
                    flext: 1,
                    paddingRight: 20,
                  }}
                >
                  <FormInput
                    name="Username"
                    value={values.username}
                    placeholder="Username"
                    autoCapitalize="none"
                    onChangeText={handleChange("username")}
                    iconName="md-person"
                    iconColor="#2C384A"
                  />
                  <MyError errorValue={touched.username && errors.username} />
                </View>

                <View
                  style={{
                    borderWidth: 0,
                    flext: 1,
                    paddingRight: 20,
                  }}
                >
                  <FormInput
                    name="Password"
                    value={values.password}
                    placeholder="Password"
                    autoCapitalize="none"
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    iconName="md-person"
                    iconColor="#2C384A"
                    onBlur={handleBlur("password")}
                  />

                  <MyError errorValue={touched.password && errors.password} />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                    {isLoading ? (
                      <ActivityIndicator
                        size="small"
                        color={colors.subprimarycolor}
                      ></ActivityIndicator>
                    ) : (
                      <View></View>
                    )}
                  </View>
                </TouchableOpacity>
              </Fragment>
            )}
          </Formik>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Don't have an account?{"   "}
              <Text onPress={onFooterLinkPress} style={styles.footerText}>
                Sign up
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    // borderColor: "red",
    // flexDirection: "row",
    // paddingTop: 100,
    // paddingBottom: 100,
  },
  inputpop: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    borderWidth: 0,
    elevation: 1,
    padding: 20,
    // marginTop:100,
    backgroundColor: colors.subprimarycolor,
    borderTopLeftRadius: 25,
    // overflow: "hidden",
    // height: 200,
    borderBottomLeftRadius: 25,
  },
  logo: {
    flex: 1,
    height: 30,
    width: 150,
    alignSelf: "center",
    marginTop: 120,
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: colors.buttonColor,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: colors.blackIconColor,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 15,
  },
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
    color: colors.highlightedTextColor,
    fontWeight: "bold",
    fontSize: 16,
  },
});

const SignInpScreenWrapper = (props) => {
  const navRef = useRef();
  return (
    <Provider store={store}>
      <LoginScreen navigation={props.navigation} />
    </Provider>
  );
};
export default SignInpScreenWrapper;
