import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CommonStyles, {
  themeInteractiveTextColor,
} from "../commom/CommonStyles";

export default function BottomTabsComponent({
  activeMainTab,
  setActiveMainTab,
}) {
  return (
    <View style={styles.tabsView}>
      <TouchableOpacity
        style={[
          CommonStyles.tab,
          activeMainTab === "myReports" && CommonStyles.activeTab,
          { borderBottomWidth: 0 },
        ]}
        onPress={() => setActiveMainTab("myReports")}
      >
        <Text
          style={[
            CommonStyles.tabText,
            activeMainTab === "myReports" && CommonStyles.activeTabText,
          ]}
        >
          My Reports
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          CommonStyles.tab,
          activeMainTab === "myNotes" && CommonStyles.activeTab,
          CommonStyles.noRightTopBorder,
          { borderBottomWidth: 0 },
        ]}
        onPress={() => setActiveMainTab("myNotes")}
      >
        <Text
          style={[
            CommonStyles.tabText,
            activeMainTab === "myNotes" && CommonStyles.activeTabText,
          ]}
        >
          My Notes
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderColor: themeInteractiveTextColor,
    borderTopWidth: 1,
  },
});
