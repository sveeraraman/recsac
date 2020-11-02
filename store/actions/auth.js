import * as services from "../actions/service";
import {
  SIGNED_USERNAME,
  FAVORITE_FOLDERS,
} from "../../constants/constantkeys";

export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

import { AsyncStorage } from "react-native";
const signupPath = "/profile/register";

const UPDATE_PROFILE = "UPDATE_PROFILE";
const DELETE_PROFILE = "DELETE_PROFILE";
const CREATE_PROFILE = "CREATE_PROFILE";

export const authenticate = (
  userid,
  token,
  username,
  expiry,
  useremail,
  phonenumber,
  ph_num_wo_ccode,
  user_firstname,
  user_lastname
) => {
  return {
    type: AUTHENTICATE,
    userid: userid,
    token: token,
    username: username,
    expiry: expiry,
    useremail: useremail,
    phonenumber: phonenumber,
    ph_num_wo_ccode: ph_num_wo_ccode,
    user_firstname: user_firstname,
    user_lastname: user_lastname,
  };
};

const signup = (profile) => {
  return async (dispatch) => {
    //var response = await services.postData(profile, signupPath);

    //cognito signup
    var response = await services.signUp(profile, signupPath);

    if (response != null && response.statusCode === 400) {
      if (response.errorMessage.includes("password")) {
        response.errorMessage =
          "Password length must be greater than or equal to 6";
      }
      if (response.errorMessage.includes("Invalid phone number")) {
        response.errorMessage = "Invalid phone number format";
      }
    }

    //now dispatch with signup indicator
    dispatch({ type: SIGNUP });

    return response;
  };
};

export const logout = () => {
  return async (dispatch) => {
    await services.logout();
    dispatch({ type: LOGOUT });
  };
};

// const clearLogoutTimer = () => {
//   if (timer) {
//     clearTimeout(timer);
//   }
// };
// const setLogoutTimer = (expirationTime) => {
//   return (dispatch) => {
//     timer = setTimeout(() => {
//       dispatch(logout());
//     }, expirationTime);
//   };
// };

const signIn = (username, password) => {
  return async (dispatch) => {
    var response;
    try {
      response = await services.signIn(username, password);
      // console.log("authresponse", response);

      // if (
      //   response.statusCode &&
      //   response.statusCode === services.SUCCESS_STATUS_CODE
      // ) {
      if (response.user != null) {
        dispatch(
          authenticate(
            response.user.username,
            response.user.signInUserSession.idToken.jwtToken,
            response.user.username,
            response.user.signInUserSession.idToken.payload.exp,
            response.user.signInUserSession.idToken.payload.email,
            response.user.signInUserSession.idToken.payload.phone_number,
            response.user.signInUserSession.idToken.payload[
              "custom:ph_num_wo_ccode"
            ],
            response.user.signInUserSession.idToken.payload[
              "custom:user_firstname"
            ],
            response.user.signInUserSession.idToken.payload[
              "custom:user_lastname"
            ]
          )
        );
      }
      //}
      //console.log("response", response);
      // console.log("token", response.user.signInUserSession.idToken.jwtToken);
    } catch (error) {
      response.error = error;
    }
    return response;
  };
};

export { UPDATE_PROFILE, DELETE_PROFILE, CREATE_PROFILE };
export { signup, signIn };
