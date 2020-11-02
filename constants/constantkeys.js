export const SIGNED_USERNAME = "SIGNED_USERNAME";
export const FAVORITE_FOLDERS = "FAVORITE_FOLDERS";
export const ADS_COUNT = "ADS_COUNT";
export const REGISTERED_USERNAME = "REGISTERED_USERNAME";
export const REGISTERED_MOBILENUMBER = "REGISTERED_MOBILENUMBER";
export const DOMAIN_NAME_WITH_AT = "@recsac.com";
export const DOMAIN_NAME_PLAIN = "Recsac";
export const SELECTED_THEME = "";
export const ENV = "prod";

export default {
  //prod
  bannerAddCompId_1: "",
  interstatialAdCompId_video: "",
  //dev
  // bannerAddCompId_1: "ca-app-pub-3940256099942544/6300978111",
  // interstatialAdCompId_video: "ca-app-pub-3940256099942544/8691691433",
};

const GetEndpoint = () => {
  var _endpoint = "";
  var _key = "";
  switch (ENV) {
    case "dev":
      _endpoint = "https://onj3ykmi01.execute-api.us-east-1.amazonaws.com/dev/";
      _key = "fKhty7qPVz1yZlto7Xe5s8GBlyqVEl1V4sVx8vAz";
      break;
    case "prod":
      _endpoint =
        "https://onj3ykmi01.execute-api.us-east-1.amazonaws.com/prod/";
      _key = "hREoUV2SWH5kHhzUgX4i7aLNgyW3HZzj6GZydCbW";
      break;
    default:
      _endpoint = "https://onj3ykmi01.execute-api.us-east-1.amazonaws.com/dev/";
      _key = "fKhty7qPVz1yZlto7Xe5s8GBlyqVEl1V4sVx8vAz";
      break;
  }
  return {
    endpoint: _endpoint,
    key: _key,
  };
};

export { GetEndpoint };
