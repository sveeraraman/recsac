import React, { useState, useEffect, Fragment } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleSheet } from "react-native";
import { useDispatch, Provider } from "react-redux";
import * as authActions from "../store/actions/auth";
import { createStore, combineReducers, applyMiddleware } from "redux";
import reducersCombined from "../store/reducers/rootreducer";
import thunk from "redux-thunk";
import { CheckBox } from "native-base";
import colors from "../constants/colors";
import { AsyncStorage } from "react-native";
import {
  REGISTERED_USERNAME,
  REGISTERED_MOBILENUMBER,
} from "../constants/constantkeys";
import { Formik } from "formik";
import FormInput from "../components/FormInput";
import * as Yup from "yup";
import MyError from "../components/ErrorMessage";
import { Picker } from "native-base";
import { AntDesign } from "@expo/vector-icons";

const store = createStore(reducersCombined, applyMiddleware(thunk));

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .label("Full name")
    .required()
    .min(2, "Must have at least 2 characters"),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a valid email for activation"),
  countrycode: Yup.string().label("countrycode").required().min(1, "*"),
  username: Yup.string()
    .label("username")
    .required()
    .min(5, "Must have at least 5 characters"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(8, "Password must have more than 8 characters "),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref("password")], "Confirm Password must matched Password")
  //   .required("Confirm Password is required"),
  phoneNumber: Yup.string()
    .label("Phone number")
    .required()
    .min(5, "Must have at least 5 characters"),
});

const SignupScreen = ({ navigation }) => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState();
  const [fullName, setFullName] = useState("");
  const [isfullNameValid, setisfullNameValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [conditionsAccepted, setconditionsAccepted] = useState(false);
  const [userName, setuserName] = useState("");
  const dispatch = useDispatch();
  const onFooterLinkPress = () => {
    navigation.replace("Login");
  };

  _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      Alert.alert(error);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const signupHandler = async (signupValues) => {
    try {
      setError(null);

      setisLoading(true);

      if (!conditionsAccepted) {
        setError("Please read and accept terms and conditions");
        setisLoading(false);
        return;
      }

      var countryCodeInput = signupValues.countrycode;
      if (countryCodeInput != null) {
        if (countryCodeInput.charAt(0) != "+") {
          countryCodeInput = "+" + countryCodeInput;
        }
      }

      var mobNumberWithCountry = countryCodeInput + signupValues.phoneNumber;
      var mobNumber_plain = signupValues.phoneNumber;

      //useReducer if you want from store.
      var result = await dispatch(
        authActions.signup({
          fullName: signupValues.fullname,
          email: signupValues.email,
          pwd: signupValues.password,
          mobilenumber: mobNumberWithCountry,
          userName: signupValues.username,
          mobNumber_plain: mobNumber_plain,
        })
      );

      //console.log("signupresult", result);
      //console.log(result.user.pool);

      setisLoading(false);

      if (
        result != null &&
        result.user != null &&
        result.user.pool.clientId != null
      ) {
        _storeData(REGISTERED_USERNAME, signupValues.username);
        _storeData(REGISTERED_MOBILENUMBER, signupValues.phoneNumber);
        //console.log("signupValues.username", signupValues.username);
        //console.log("mobNumberWithCountry", mobNumberWithCountry);

        navigation.navigate("SignupSuccess");
      } else {
        setError(result.errorMessage);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handlecountryCode = (fn, val) => {};

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: "#f5f5f5",
        // borderWidth: 5,
        // borderColor: "red",
      }}
    >
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text
          style={{
            fontSize: 24,
            width: "100%",
            flex: 1,
            textAlign: "center",
            paddingTop: 40,
            paddingBottom: 20,
            color: colors.iconColor,
          }}
        >
          Enter your account details
        </Text>
        <View style={styles.inputpop}>
          <Formik
            initialValues={{
              fullname: "",
              email: "",
              countrycode: "+91",
              username: "",
              password: "",
              // confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              //handleSubmit(values);
              //console.log("values", values);
              signupHandler(values);
              //Alert.alert(values);
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
                    width: "90%",
                  }}
                >
                  <FormInput
                    name="fullname"
                    value={values.fullname}
                    placeholder="First Name   Last Name"
                    autoCapitalize="none"
                    onChangeText={handleChange("fullname")}
                    iconName="md-person"
                    iconColor="#2C384A"
                  />
                  <MyError errorValue={touched.fullname && errors.fullname} />
                </View>
                <View
                  style={{
                    borderWidth: 0,
                    flext: 1,
                    width: "90%",
                  }}
                >
                  <FormInput
                    name="email"
                    value={values.email}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={handleChange("email")}
                    iconName="ios-mail"
                    iconColor="#2C384A"
                  />
                  <MyError errorValue={touched.email && errors.email} />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 0,
                    //paddingBottom: 10,
                    paddingTop: 6,
                    marginRight: 20,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 0,
                      //justifyContent: "flex-end",
                      //alignItems: "flex-end",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 0,
                        marginLeft: 0,
                        paddingRight: 0,
                        borderColor: "black",
                        backgroundColor: colors.backgroundColor,
                        width: 80,
                      }}
                    >
                      <FormInput
                        name="countrycode"
                        value={values.countrycode}
                        placeholder="Code"
                        autoCapitalize="none"
                        onChangeText={handleChange("countrycode")}
                        iconName="ios-mail"
                        iconColor="#2C384A"
                      />
                      <MyError
                        errorValue={touched.countrycode && errors.countrycode}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      borderWidth: 0,
                      justifyContent: "space-around",
                      alignItems: "flex-end",
                      width: "67%",
                      paddingLeft: 10,
                    }}
                  >
                    <FormInput
                      name="phoneNumber"
                      value={values.phoneNumber}
                      placeholder="Phone number"
                      autoCapitalize="none"
                      onChangeText={handleChange("phoneNumber")}
                      iconName="md-person"
                      iconColor="#2C384A"
                      keyboardType="phone-pad"
                    />
                    <MyError
                      errorValue={touched.phoneNumber && errors.phoneNumber}
                    />
                  </View>
                </View>

                <View
                  style={{
                    borderWidth: 0,
                    flext: 1,
                    width: "90%",
                    padding: 0,
                  }}
                >
                  <FormInput
                    name="username"
                    value={values.username}
                    placeholder="Username"
                    autoCapitalize="none"
                    onChangeText={handleChange("username")}
                    iconName="ios-person"
                    iconColor="#2C384A"
                  />
                  <MyError errorValue={touched.username && errors.username} />
                </View>
                <View
                  style={{
                    borderWidth: 0,
                    flext: 1,
                    width: "90%",
                  }}
                >
                  <FormInput
                    name="password"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    placeholder="Password"
                    secureTextEntry
                    iconName="ios-lock"
                    iconColor="#2C384A"
                    onBlur={handleBlur("password")}
                  />
                  <MyError errorValue={touched.password && errors.password} />
                </View>
                <View style={styles.checkbox}>
                  <CheckBox
                    checked={conditionsAccepted === true}
                    color={colors.primaryColor}
                    onPress={() =>
                      setconditionsAccepted(conditionsAccepted ? false : true)
                    }
                  />
                  <Text
                    style={{
                      ...styles.checkBoxTxt,
                    }}
                  >
                    I agree to all
                    <Text
                      style={{
                        ...styles.linktext,
                      }}
                      onPress={() => {
                        navigation.navigate("Policy");
                      }}
                    >
                      {" "}
                      terms of service and privacy policy
                    </Text>
                  </Text>
                </View>

                {/* <MyButton
                onClick={handleSubmit}
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
                text="Register"
              ></MyButton> */}
                {/* 
              {isLoading ? (
                <ActivityIndicator
                  size="small"
                  color={colors.secondaryColor}
                ></ActivityIndicator>
              ) : (
                <FormButton
                  text="Register"
                  onClick={handleSubmit}
                  title="Register"
                  buttonColor="#F57C00"
                  //disabled={!isValid || isSubmitting}
                  //loading={isSubmitting}
                ></FormButton>
              )} */}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.buttonTitle}>Register</Text>
                    {isLoading ? (
                      <ActivityIndicator
                        size="small"
                        color="#fff"
                      ></ActivityIndicator>
                    ) : (
                      <View></View>
                    )}
                  </View>
                </TouchableOpacity>
              </Fragment>
            )}
          </Formik>
        </View>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{"   "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
    paddingTop: 15,
    marginBottom: 0,
    borderWidth: 0,
    justifyContent: "center",
    flexDirection: "row",
  },
  inputpop: {
    //flex: 1,
    borderWidth: 0,
    padding: 20,
    backgroundColor: colors.popupbackgroungcolor,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    //borderBottomLeftRadius: 25,
    //paddingBottom: 50,
    //paddingTop: 20,
    //height: "100%",
  },
  title: {},
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },
  input: {
    height: 48,
    overflow: "hidden",
    marginTop: 2,
    // marginBottom: 10,
    marginLeft: 20,
    marginRight: 30,
    paddingLeft: 10,
    borderBottomWidth: 0.75,
    borderBottomColor: "white",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  button: {
    backgroundColor: colors.buttonColor,
    //marginLeft: 30,
    //marginRight: 30,
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
    paddingTop: 10,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: colors.fontDefColor,
    fontWeight: "bold",
    fontSize: 16,
  },
  checkbox: {
    //padding: 10,
    flexDirection: "row",
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    //backgroundColor: "white",
    color: "white",
    paddingRight: 30,
    paddingTop: 10,
  },
  checkBoxTxt: {
    marginLeft: 20,
    color: colors.fontDefColor,
  },
  linktext: {
    color: "blue",
    paddingLeft: 20,
    margin: 20,
    padding: 20,
  },
});

// SignupScreenWrapper.navigationOptions = (navdata) => {
//   // console.log(navdata);
//   const { state } = navdata;
//   const routes = state.routes[state.index];
//   console.log(routes);
//   return {
//     headerTitle: "Folders",
//     // tabBarVisible: false,
//   };
// };

const SignupScreenWrapper = (props) => {
  return (
    <Provider store={store}>
      <SignupScreen navigation={props.navigation} />
    </Provider>
  );
};
export default SignupScreenWrapper;
