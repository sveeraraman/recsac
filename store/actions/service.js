import { API, Auth } from "aws-amplify";
import { AsyncStorage } from "react-native";
import {
  SIGNED_USERNAME,
  FAVORITE_FOLDERS,
  SELECTED_THEME,
  GetEndpoint,
} from "../../constants/constantkeys";

export const SUCCESS_STATUS_CODE = "200";
export const FAILURE_STATUS_CODE = "400";

async function postData(bodydata, actionPath, counter) {
  const apiName = "folderservices";
  const path = actionPath;
  const parseduserData = await getUserDataFromCache();
  const envdetails = GetEndpoint();
  if (!counter) {
    counter = 1;
  } else {
    counter++;
  }
  // console.log("counter", counter);
  if (counter > 2) {
    return;
  }
  const request = {
    body: bodydata, // replace this with attributes you need
    headers: {
      "Content-Type": "application/json",
      Authorization: parseduserData.token,
      "x-api-key": envdetails.key,
    },
  };
  var response = {};
  try {
    response = await API.post(apiName, path, request);
  } catch (error) {
    if (error.message == "Request failed with status code 401") {
      //refresh token and try again
      await refreshToken();
      postData(bodydata, actionPath, counter);
    } else {
      console.log(error);
    }
  }
  return response;
}

const getUserDataFromCache = async () => {
  var userData = await AsyncStorage.getItem(SIGNED_USERNAME);
  const transformedData = JSON.parse(userData);
  return transformedData;
};

const getfavDataFromCache = async () => {
  var favData = await AsyncStorage.getItem(FAVORITE_FOLDERS);
  const transformedData = JSON.parse(favData);
  return transformedData;
};

const logout = async () => {
  await AsyncStorage.removeItem(SIGNED_USERNAME);
  await AsyncStorage.removeItem(FAVORITE_FOLDERS);
  await AsyncStorage.clear();
  await Auth.cleanCachedItems();
};

const writeToCache = async (action) => {
  var action_result = {
    expiry: action.expiry,
    phonenumber: action.phonenumber,
    token: action.token,
    useremail: action.useremail,
    userid: action.userid,
    username: action.username,
    ph_num_wo_ccode: action.ph_num_wo_ccode,
    user_firstname: action.user_firstname,
    user_lastname: action.user_lastname,
  };
  // console.log("action_result_writetocache", action_result);
  await AsyncStorage.setItem(SIGNED_USERNAME, JSON.stringify(action_result));
};

const ThemeSelected = async (_name) => {
  var selected_theme = {
    name: _name,
  };
  await AsyncStorage.setItem(SELECTED_THEME, JSON.stringify(selected_theme));
};

const GetSelectedTheme = async () => {
  var selTheme = await AsyncStorage.getItem(SELECTED_THEME);
  if (selTheme != null) {
    return JSON.parse(selTheme);
  } else {
    return { name: "" };
  }
};

const writeFavToCache = async (favs) => {
  await AsyncStorage.setItem(FAVORITE_FOLDERS, JSON.stringify(favs));
  var test = await getfavDataFromCache();
};

const refreshToken = async () => {
  try {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const currentSession = cognitoUser.signInUserSession;
    cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
      writeToCache({
        userid: cognitoUser.username,
        token: session.idToken.jwtToken,
        username: cognitoUser.username,
        expiry: session.idToken.payload.exp,
        useremail: session.idToken.payload.email,
        phonenumber: session.idToken.payload.phone_number,
        ph_num_wo_ccode: session.idToken.payload["custom:ph_num_wo_ccode"],
        user_firstname: session.idToken.payload["custom:user_firstname"],
        user_lastname: session.idToken.payload["custom:user_lastname"],
      });
    });
  } catch (e) {
    console.log("Unable to refresh Token", e);
  }
};

async function signUp(userProfile, actionPath) {
  var response = {};
  try {
    const username = userProfile.userName;
    const password = userProfile.pwd;
    const email = userProfile.email;
    const phone_number = userProfile.mobilenumber;
    const phone_number_plain = userProfile.mobNumber_plain;
    const user_firstname = userProfile.fullName;
    const user_lastname = "";

    const user = await Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        phone_number, // optional - E.164 number convention
        "custom:ph_num_wo_ccode": phone_number_plain,
        "custom:user_firstname": user_firstname,
      },
    });
    response.statusCode = SUCCESS_STATUS_CODE;
    response.user = user;
    //console.log({ user });
    return user;
  } catch (error) {
    console.log({ error });
    response.statusCode = FAILURE_STATUS_CODE;
    response.errorMessage = error.message.replace(
      "PreSignUp failed with error",
      ""
    );
  }
  return response;
}

async function signIn(username, password) {
  var response = {
    statusCode: "",
  };
  try {
    const user = await Auth.signIn(username, password);
    response.statusCode = SUCCESS_STATUS_CODE;
    response.user = user;
  } catch (error) {
    //console.log("error signing in", error);
    response.statusCode = FAILURE_STATUS_CODE;
    response.errorMessage = error.message;
    response.user = null;
    //throw error;
  }
  return response;
}

export {
  postData,
  signUp,
  signIn,
  getUserDataFromCache,
  writeToCache,
  refreshToken,
  writeFavToCache,
  getfavDataFromCache,
  logout,
  ThemeSelected,
  GetSelectedTheme,
};
