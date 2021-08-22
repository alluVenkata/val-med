import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const themeBackgroundColor = "#ADD8E6";
export const themeBackgroundColorLight = "#F2FAFD";
export const themeInteractiveTextColor = "#2A7189";
export const greyBorder = "#989898";
export const darkGrey = "#4D4D4D";
export const secondaryTextColor = "grey";
const greyBackground = "#989898";
export const disabledGreyColor = "#CDCDCD";

export default StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: themeBackgroundColor,
    width: "100%",
  },
  container: {
    width: "100%",
    // paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: themeBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  // headerStyle: {
  //   marginTop: Constants.statusBarHeight,
  //   position: "absolute",
  //   top: Constants.statusBarHeight,
  // },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: greyBorder,
  },
  flexRow: {
    flexDirection: "row",
  },
  flexJustifySpaceBetween: {
    justifyContent: "space-between",
  },
  inputView: {
    // backgroundColor: "white",
    borderRadius: 30,
    width: "100%",
    height: 45,
    marginBottom: 20,
  },
  textInputStyle: {
    borderColor: greyBorder,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
  },
  cardView: {
    backgroundColor: "white",
    borderRadius: 15,
    width: "100%",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    marginBottom: 20,
  },
  cardViewSuccess: {
    borderColor: "green",
    borderWidth: 1,
  },
  cardViewDisabled: {
    backgroundColor: disabledGreyColor,
  },
  topVSpace20: {
    marginTop: 20,
  },
  displayFlexAlignCenter: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
  },
  buttonDefault: {
    width: "100%",
    padding: 10,
    alignItems: "center",
    backgroundColor: greyBackground,
  },
  buttonTextDefault: {
    color: "white",
  },
  buttonPrimary: {
    minWidth: 200,
    backgroundColor: themeBackgroundColor,
    borderRadius: 30,
  },
  buttonPrimaryLight: {
    backgroundColor: themeBackgroundColorLight,
    borderColor: themeInteractiveTextColor,
    borderWidth: 1,
    borderRadius: 30,
  },
  buttonTextPrimary: {
    fontSize: 18,
    fontWeight: "bold",
    color: themeInteractiveTextColor,
  },
  buttonLink: {
    width: "auto",
    padding: 0,
  },
  buttonTextLink: {
    textDecorationLine: "underline",
    width: "auto",
    color: themeInteractiveTextColor,
  },
  buttonLinkSecondary: {
    padding: 0,
    textDecorationLine: "none",
  },
  buttonTextLinkSecondary: {
    color: secondaryTextColor,
  },
  h1: {
    fontSize: 32,
  },
  h2: {
    fontSize: 24,
  },
  activeTab: {
    backgroundColor: themeInteractiveTextColor,
    color: themeBackgroundColorLight,
  },

  noRightTopBorder: {
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  tab: {
    fontSize: 16,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
    alignItems: "center",
    borderColor: themeInteractiveTextColor,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: themeBackgroundColorLight,
    color: "black",
  },
  tabText: {
    color: "black",
  },
  activeTabText: {
    color: "white",
  },
});
