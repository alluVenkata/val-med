import React from "react";
import { ActivityIndicator, View } from "react-native";
import { themeInteractiveTextColor } from "./CommonStyles";

export default function LoadingComponent({ height, width }) {
  return (
    <View
      style={{
        height: height,
        width: width,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"large"} color={themeInteractiveTextColor} />
    </View>
  );
}
