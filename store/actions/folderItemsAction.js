import { API } from "aws-amplify";
import * as services from "../actions/service";
import FolderItem from "../../models/FolderItem";
import AttachmentItem from "../../models/AttachmentItem";
import { AsyncStorage } from "react-native";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const GET_FOLDERS_ITEMS_LIST_BEGIN = "GET_FOLDERS_ITEMS_LIST_BEGIN";
const GET_FOLDERS_ITEMS_LIST_SUCCESS = "GET_FOLDERS_ITEMS_LIST_SUCCESS";
const GET_FOLDERS_ITEMS_LIST_FAILED = "GET_FOLDERS_ITEMS_LIST_FAILED";
const GET_ATTACHMENT_LINKS = "GET_ATTACHMENT_LINKS";
const SET_FOLDER_MOVE_RULE = "SET_FOLDER_MOVE_RULE";
export const EXTEND_OBJECT_RETENTION = "EXTEND_OBJECT_RETENTION";
const getFolderItemsPath = "/folders/all";
const configUpdatePath = "/config/update";
const extendObjectRetentionPath = "/config/update";

const getUserFromCache = async () => {
  var parseduserData = await services.getUserDataFromCache();
  // console.log("parseduserData", parseduserData);
  return parseduserData;
};

const setFolderMove = (fromAddress, toFolderRule) => {
  return async (dispatch) => {
    // console.log("fromAddress", fromAddress);
    // console.log("toFolderRule", toFolderRule);
    var user = await getUserFromCache();
    var phonenumber;
    if (!phonenumber) {
      phonenumber = user.ph_num_wo_ccode;
    }
    //console.log("setFolderMove", user);
    var response = await services.postData(
      {
        purpose: "put",
        customerName: user.userid,
        phonenumber: phonenumber,
        rule: {
          fromId: fromAddress,
          toFolder: toFolderRule,
        },
      },
      configUpdatePath
    );

    dispatch({
      type: SET_FOLDER_MOVE_RULE,
      rulepayload: {
        fromAddress: fromAddress,
        toFolder: toFolderRule,
      },
    });
  };
};

export const extendRetention = (itemkey, newRetVal) => {
  return async (dispatch, getState) => {
    try {
      var username;
      username = await getUserFromCache();
      var request = {
        customerName: username.userid,
        purpose: "addTag",
        addTag: {
          userid: username.userid,
          key: itemkey,
          tag: {
            tname: "expirydays",
            tvalue: newRetVal.toString(),
          },
        },
      };
      // console.log(request);
      var response = await services.postData(
        request,
        extendObjectRetentionPath
      );
      dispatch({
        type: EXTEND_OBJECT_RETENTION,
        folderItemsExtension: {
          response,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

const getItemsByFolder = (folderName) => {
  return async (dispatch, getState) => {
    try {
      var username;

      var folderItemListContainer = {
        items: [],
      };

      dispatch(getFolderItemsStarted(folderItemListContainer));

      username = await getUserFromCache();

      var cleansedFolderName = folderName.replace("/", "");
      // console.log("cleansedFolderName", cleansedFolderName);

      var response = await services.postData(
        {
          customerName: username.userid,
          folderName: cleansedFolderName,
        },
        getFolderItemsPath
      );

      // console.log("bodyResponse", response);

      if (response != null && response.statusCode == "200") {
        var bodyPrefix = response.body.Prefix;
        folderItemListContainer.name = response.body.Name;
        folderItemListContainer.isTruncated = response.body.IsTruncated;
        folderItemListContainer.Marker = response.body.Marker;
        response.body.Contents.forEach((item) => {
          var attachments = [];
          // var itemEtag = item.ETag.replace(/"/g, "");
          var itemKey = item.Key;
          var keyWithoutFolderName = itemKey.replace(folderName + "/", "");
          var keySections = keyWithoutFolderName.split("|");

          var keyvalues = [];
          try {
            keySections.map((p) => {
              var keyvals = p.split("_");
              if (keyvals && keyvals.length > 0) {
                //[0] key, [1] val
                keyvalues.push({
                  key: keyvals[0],
                  value: keyvals[1],
                });
              }
            });
          } catch (error) {
            console.log(error);
          }

          const getValue = (keystring) => {
            if (keyvalues && keyvalues.length > 0) {
              var filtered = keyvalues.filter((k) => k.key == keystring);
              if (filtered && filtered.length > 0) {
                return filtered[0].value;
              }
            }
            return "";
          };

          // console.log(keyvalues);
          // console.log("Key", getValue("key"));
          // console.log("Sub", getValue("Sub"));
          // console.log("from", getValue("from"));
          // console.log("to", getValue("to"));

          var itemLastModified = new Date(item.LastModified);

          var recdatestring =
            itemLastModified.getFullYear().toString() +
            "-" +
            itemLastModified.getMonth().toString() +
            "-" +
            itemLastModified.getDate().toString() +
            " " +
            itemLastModified.getHours().toString() +
            ":" +
            itemLastModified.getMinutes().toString() +
            ":" +
            itemLastModified.getSeconds().toString();

          // if (subjectSplitterIndex > 0) {
          //   subjectFiltered = subject.substring(0, subjectSplitterIndex);
          // }

          //check for attachments
          if (
            response.body.CommonPrefixes != null &&
            response.body.CommonPrefixes.length > 0
          ) {
            //console.log("attachmentPrefix", itemPrimaryKey);
            var attachmentPrefix =
              bodyPrefix + "attachments_" + getValue("key") + "/";
            var attachmentFromResp = response.body.CommonPrefixes.filter(
              (m) => {
                //console.log("attachmentPrefix", attachmentPrefix);
                return m.Prefix === attachmentPrefix;
              }
            );

            // console.log("attachmentFromResp", attachmentFromResp);

            if (
              attachmentFromResp != null &&
              attachmentFromResp != undefined &&
              attachmentFromResp.length > 0
            ) {
              attachments = attachmentFromResp;
              // console.log("attachments", attachments);
            }
          }

          //console.log("attachments", attachments);
          var fromName = getValue("fromName");
          if (!fromName) {
            fromName = getValue("from");
          }
          if (fromName != undefined) {
            fromName = fromName.replace(".html", "");
          }

          folderItemListContainer.items.push(
            new FolderItem(
              item.id,
              cleansedFolderName,
              fromName,
              recdatestring,
              getValue("Sub"),
              "",
              attachments,
              item.signedUrl,
              item.expiry,
              item.Size,
              item.StorageClass,
              item.Key,
              getValue("to"),
              getValue("from"),
              getValue("key"),
              item.tags
            )
          );
        });
      }

      dispatch(getFolderItemsSuccess(folderItemListContainer));
    } catch (error) {
      // dispatch(getFoldersFailure(error));
      console.log(error);
      throw error;
    }
  };
};

const getAttachmentLinks = (attachmentPath) => {
  return async (dispatch, getState) => {
    try {
      var username = await getUserFromCache();

      var attachmentDetails = {
        items: [],
      };

      if (attachmentPath == null) {
        return dispatch({
          type: GET_ATTACHMENT_LINKS,
          attachmentDetails,
        });
      }
      // var attachmentlinks=[];
      var attachmentFolderPath = attachmentPath[0].Prefix;

      if (attachmentFolderPath.endsWith("/")) {
        attachmentFolderPath = attachmentFolderPath.substring(
          0,
          attachmentFolderPath.length - 1
        );
      }

      // console.log("attachmentPath", attachmentFolderPath);

      var response = await services.postData(
        {
          customerName: username.userid,
          folderName: attachmentFolderPath,
        },
        getFolderItemsPath
      );

      // console.log("response", response);

      if (response != null && response.statusCode == "200") {
        var bodyPrefix = response.body.Prefix;
        attachmentDetails.name = response.body.Name;
        attachmentDetails.isTruncated = response.body.IsTruncated;
        attachmentDetails.Marker = response.body.Marker;

        response.body.Contents.forEach((item) => {
          var itemKey = item.Key;
          var itemPrimaryKey = item.ETag;
          var itemLastModified = new Date(item.LastModified);
          var fileName = itemKey
            .replace(attachmentFolderPath, "")
            .replace("/", "");

          attachmentDetails.items.push(
            new FolderItem(
              item.id, //id
              fileName, //foldername
              item.Owner.DisplayName, //from
              item.LastModified, //recd date
              itemKey, //subject
              "", //snippet
              "", //attachments
              item.signedUrl, //signed url
              "", //expiry
              item.Size, //size
              item.StorageClass, //storage class
              itemKey
            )
          );
        });
      }
      dispatch({
        type: GET_ATTACHMENT_LINKS,
        attachmentDetails,
      });
    } catch (error) {
      // dispatch(getFoldersFailure(error));
      console.log(error);
      throw error;
    }
  };
  // return folderItemListContainer;
};

const getFolderItemsStarted = (itemsContainer) => ({
  type: GET_FOLDERS_ITEMS_LIST_BEGIN,
  folderItemsContainer: {
    itemsContainer,
  },
});

const getFolderItemsSuccess = (itemsContainer) => ({
  type: GET_FOLDERS_ITEMS_LIST_SUCCESS,
  folderItemsContainer: {
    itemsContainer,
  },
});

const getFolderItemsFailure = (error) => ({
  type: GET_FOLDERS_ITEMS_LIST_FAILED,
  folderItemsContainer: {
    error,
  },
});

export {
  GET_FOLDERS_ITEMS_LIST_BEGIN,
  GET_FOLDERS_ITEMS_LIST_SUCCESS,
  GET_FOLDERS_ITEMS_LIST_FAILED,
  GET_ATTACHMENT_LINKS,
  SET_FOLDER_MOVE_RULE,
};
export { getItemsByFolder, getAttachmentLinks, setFolderMove };
