import { white } from "ansi-colors";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CommonStyles, { themeBackgroundColor } from "../commom/CommonStyles";
import UserHeader from "../commom/UserHeader";
import Notifications from "./Notifications";
import UsefullLinks from "./usefullLinks";

export default function SelfHelp({ navigation }) {
  return (
    <View style={[CommonStyles.container, styles.container]}>
      {/* <UserHeader noBack /> */}
      <ScrollView style={CommonStyles.scrollViewContainer}>
        <View style={styles.scrollContainerPadding}>
          <Text style={CommonStyles.h1}>Notifications</Text>
          <View style={styles.notificationsView}>
            <Notifications />
          </View>
          <UsefullLinks />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainerPadding: {
    padding: 10,
  },
  notificationsView: {
    marginTop: 10,
    width: "100%",
  },
  container: {
    padding: 0,
  },
});
