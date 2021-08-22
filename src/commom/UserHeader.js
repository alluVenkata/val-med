import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUserAuthContext } from "../context/UserAuth";
import ButtonComponent from "./ButtonComponent";
import {
  themeBackgroundColor,
  themeInteractiveTextColor,
} from "./CommonStyles";
import Constants from "expo-constants";
// import { SafeAreaView } from "react-native-safe-area-context";

export default function UserHeader({ noBack, navigation }) {
  const { userDetails } = useUserAuthContext();
  return (
    <View>
      <StatusBar backgroundColor={themeBackgroundColor} />
      <View
        style={[
          styles.headerView,
          { paddingTop: Platform.OS === "ios" ? Constants.statusBarHeight : 0 },
        ]}
      >
        <View>
          {noBack ? (
            <View />
          ) : (
            <ButtonComponent
              type="link"
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons
                name="chevron-back"
                size={15}
                color={themeInteractiveTextColor}
                // style={{ textDecorationLine: "none" }}
              />
              {"Back"}
            </ButtonComponent>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("MyDetails")}>
          <View style={styles.profileView}>
            <Text style={styles.userShortName}>
              {userDetails?.userShortName}
            </Text>
            <View style={styles.avatar}>
              <Text>5</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: themeBackgroundColor,
    paddingLeft: 10,
    paddingRight: 10,
    // paddingTop: Constants.StatusBarHeight,
    // position: "absolute",
    // top: 0,
  },
  profileView: {
    flexDirection: "row",
  },
  userShortName: {
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  avatar: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingLeft: 10,
    paddingTop: 5,
    width: 30,
    height: 30,
  },
  backButton: {
    fontSize: 20,
  },
});
