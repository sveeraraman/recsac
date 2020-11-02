import { AUTHENTICATE, LOGOUT } from "../actions/auth";
import { AsyncStorage } from "react-native";
import { writeToCache } from "../actions/service";

const initialState = {
  expiry: null,
  phonenumber: null,
  token: null,
  useremail: null,
  userId: null,
  token: null,
  ph_num_wo_ccode: null,
  user_firstname: null,
  user_lastname: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
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
      // console.log("action_result", action);
      writeToCache(action);
      return action_result;
    case LOGOUT:
      //console.log("logged out");
      return initialState;
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   };
    default:
      return state;
  }
};
