import { API } from "aws-amplify";
import * as services from "../actions/service";
import Friend from "../../models/Friend";
import * as cons from "../../constants/constantkeys";

export const GET_FRIENDS_LIST = "GET_FRIENDS_LIST";
export const INVITE_FRIENDS = "INVITE_FRIENDS";
export const ADD_FRIENDS_LIST = "ADD_FRIENDS_LIST";
export const SHARE_WITH_FRIENDS = "SHARE_WITH_FRIENDS";
const configUpdatePath = "/config/update";
const sendInvitePath = "/common/invite";
const shareWithFriendsPath = "/folders/share";

const sendInvitation = (selectedList) => {
  return async (dispatch) => {
    try {
      // console.log(selectedList);
      var parseduserData = await services.getUserDataFromCache();
      //console.log(parseduserData);
      var postRequest = {
        userFirstName: parseduserData.user_firstname,
        customerName: parseduserData.userid,
        phonenumber: parseduserData.phonenumber,
        invitees: selectedList,
      };

      var response = await services.postData(postRequest, sendInvitePath);
      // console.log(response);

      dispatch({
        type: INVITE_FRIENDS,
        inviteResponse: response,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const shareWithFriends = (messagekey, contacts) => {
  return async (dispatch) => {
    try {
      var parseduserData = await services.getUserDataFromCache();
      var username = parseduserData.userid;
      var phonenumber = parseduserData.phonenumber;
      var useremail = parseduserData.useremail;
      var destinationphones = contacts.map((m) => {
        return m.phone + cons.DOMAIN_NAME_WITH_AT;
      });
      var request = {
        Records: [
          {
            eventSource: "app",
            ses: {
              mail: {
                timestamp: "2019-02-15T18:53:20.596Z",
                source: useremail,
                messageId: messagekey,
                destination: destinationphones,
              },
            },
          },
        ],
      };

      var response = await services.postData(request, shareWithFriendsPath);
      //console.log(request);
      dispatch({
        type: SHARE_WITH_FRIENDS,
        sharedWithlist: contacts,
        status: 200,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getFriendsList = () => {
  return async (dispatch) => {
    try {
      var parseduserData = await services.getUserDataFromCache();
      var username = parseduserData.userid;
      var phonenumber = parseduserData.phonenumber;
      var friendsList = [];

      var response = await services.postData(
        {
          purpose: "get",
          customerName: username,
        },
        configUpdatePath
      );

      if (response != null && response.statusCode == "200") {
        var friendsFromConfig = JSON.parse(response.body.config).friends;
        if (friendsFromConfig) {
          friendsFromConfig.forEach((f, index) => {
            friendsList.push(
              new Friend(index, f.firstName, f.phonenumber, f.email, f.value)
            );
          });
        }
      } else {
        if (response && response.statusCode == "400") {
          throw new Error("Something went wrong in getFriendsList");
        }
      }
      dispatch({
        type: GET_FRIENDS_LIST,
        friendsList: friendsList,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export { getFriendsList, sendInvitation, shareWithFriends };
