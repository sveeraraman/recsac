import Folder from "../models/Folder";

export const FOLDERS = {};

export const contacts_dummy = [];

for (let index = 0; index < 10; index++) {
  contacts_dummy.push({
    phoneNumbers: [
      {
        digits: "+11234567890",
      },
    ],
    emails: [
      {
        email: "a@b.com",
      },
    ],
    firstName: "",
    lastName: "",
  });
}
