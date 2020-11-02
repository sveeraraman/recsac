// import { API } from "aws-amplify";

// const UPDATE_PROFILE = "UPDATE_PROFILE";
// const DELETE_PROFILE = "DELETE_PROFILE";
// const CREATE_PROFILE = "CREATE_PROFILE";

// async function postData(bodydata) {
//   const apiName = "folderservices";
//   const path = "/profile/register";
//   const myInit = {
//     // OPTIONAL
//     body: bodydata, // replace this with attributes you need
//     headers: {}, // OPTIONAL
//   };

//   return await API.post(apiName, path, myInit);
// }

// // create user
// function createProfile(profile) {
//   return async (dispatch) => {
//     console.log(profile);

//     var response = await postData(profile);

//     //console.log(response);

//     // if (!response.ok) {
//     //   throw new Error("something went wrong");
//     // }

//     //const respData = await response.json();
//     console.log(response);

//     //now dispatch
//     dispatch({
//       type: CREATE_PROFILE,
//       profile,
//     });
//   };
// }

// // when user update profile
// function updateProfile(profile) {
//   return {
//     type: UPDATE_PROFILE,
//     profile,
//   };
// }

// // when user sign out
// function deleteProfile() {
//   return { type: DELETE_PROFILE };
// }

// export { UPDATE_PROFILE, DELETE_PROFILE, CREATE_PROFILE };
// export { updateProfile, deleteProfile, createProfile };
