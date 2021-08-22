import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SYMPTOMS_FILTER } from "../howIFeel";
import CommonStyles from "./CommonStyles";

const defaultTabs = ["Latest", "Week", "Month", "Year"];
export const defaultTabKeys = [
  "latest",
  "recentWeeks",
  "recentMonths",
  "recentYear",
];

export default function ChartTabs({
  tabs = defaultTabs,
  onTabChange,
  disabled,
}) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const handleTabChange = (index) => {
    setActiveTabIndex(index);
    onTabChange(defaultTabKeys[index]);
  };
  return (
    <View style={styles.tabsView}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          style={[
            CommonStyles.tab,
            index === activeTabIndex && CommonStyles.activeTab,
            index === tabs.length - 1 && CommonStyles.noRightTopBorder,
          ]}
          onPress={() => handleTabChange(index)}
          key={tab}
          disabled={disabled}
        >
          <Text
            style={[
              CommonStyles.tabText,
              index === activeTabIndex && CommonStyles.activeTabText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabsView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    // borderColor: themeInteractiveTextColor,
    // borderWidth: 1,
  },
});
