export const THEME_KEY = "SELECTED_THEME";

export const themes = [
  { name: "blue", value: "blue" },
  { name: "gray", value: "fitbit" },
];

var selectedTheme = null;

if (selectedTheme == null) {
  selectedTheme = "lightblue";
}

var _primarycolor = "";
var _secondarycolor = "";
var _subprimarycolor = "";
var _textcolor = "";
var _iconcolor = "";
var _hightextcolor = "";
var _popbgcolor = "#f5f5f5";
var _buttoncolor = "#0E8DB3";
var _borderwidth = 0.25;
var _bordercolor = "#dddddd";
var _blackiconcolor = "#3F3F3F";
var _whiteiconcolor = "#f5f5f5";

switch (selectedTheme) {
  case "lightblue":
    _primarycolor = "#EDB808";
    _secondarycolor = "#EDB808";
    _subprimarycolor = "#F6F6F8";
    _textcolor = "#3e3e3e";
    _iconcolor = "#5F5F5F";
    _hightextcolor = "#f5f5f5";
    _popbgcolor = "#f5f5f5";
    _buttoncolor = "#EDB808";
    _borderwidth = 0.25;
    _bordercolor = "#B8BBC6";
    _blackiconcolor = "#3F3F3F";
    break;
  case "yellow":
    _primarycolor = "#FDB002";
    _secondarycolor = "#34D5EA";
    _subprimarycolor = "#F6F6F8";
    _textcolor = "#3e3e3e";
    _iconcolor = "#3F3F3F";
    _hightextcolor = "#3e3e3e";
    _popbgcolor = "#f5f5f5";
    _buttoncolor = "#FDB002";
    _borderwidth = 0.25;
    _bordercolor = "#B8BBC6";
    _blackiconcolor = "#3F3F3F";
    break;
  case "black":
    _primarycolor = "black";
    _secondarycolor = "#f5f5f5";
    _subprimarycolor = "#0384AB";
    _textcolor = "white";
    _iconcolor = "white";
    _hightextcolor = "black";
    _blackiconcolor = "#f5f5f5";
    break;
  case "blue":
    _primarycolor = "#47C1E6"; //"#47C1E6";
    _secondarycolor = "#3D97B3";
    _subprimarycolor = "#0384AB";
    _textcolor = "#343434";
    _iconcolor = "#5F6263";
    _hightextcolor = "#343434";
    break;
  case "gray":
    _primarycolor = "lightgray";
    _secondarycolor = "#9CC3D5FF";
    _subprimarycolor = "#9B9D9E";
    _textcolor = "#343434";
    _iconcolor = "#5E5D5E";
    _hightextcolor = "#343434";
    break;
  default:
    _primarycolor = "#47C1E6";
    _secondarycolor = "#3D97B3";
    _subprimarycolor = "#0384AB";
    _textcolor = "#343434";
    _iconcolor = "#f5f5f5";
    _hightextcolor = "#f5f5f5";
    break;
}

export default {
  primaryColor: _primarycolor, //"#0063B2FF", //2C5F2D & 97BC62FF, fc5185
  secondaryColor: _secondarycolor, //"#9CC3D5FF",
  highlightedTextColor: _hightextcolor,
  bodyTextColor: "#000000FF",
  logoColor: "#F85C5E",
  borderColor: _bordercolor,
  defaultFontSize: 15,
  iconsize: 30,
  subprimarycolor: _subprimarycolor, //"#4AB6B8",
  buttonColor: _buttoncolor,
  backgroundColor: _popbgcolor,
  iconColor: _iconcolor,
  fontDefColor: _textcolor,
  popupbackgroungcolor: _popbgcolor,
  blackIconColor: _blackiconcolor,
  borderwidth: _borderwidth,
  whiteiconcolor: _whiteiconcolor,
};

// Array.prototype.inArray = function (comparer) {
//   for (var i = 0; i < this.length; i++) {
//     if (comparer(this[i])) return true;
//   }
//   return false;
// };

// // adds an element to the array if it does not already exist using a comparer
// // function
// Array.prototype.pushIfNotExist = function (element, comparer) {
//   if (!this.inArray(comparer)) {
//     this.push(element);
//   }
// };
