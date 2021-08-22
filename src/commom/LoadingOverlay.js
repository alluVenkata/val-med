import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { themeBackgroundColor } from "./CommonStyles";

export default function LoadingOverlay({ loading }) {
  if (!loading) {
    return null;
  }
  return (
    <View style={styles.overlayView}>
      <ActivityIndicator color={themeBackgroundColor} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlayView: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.5,
    elevation: 10,
    zIndex: 100,
  },
});
