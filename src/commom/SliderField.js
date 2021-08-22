import Slider from "@react-native-community/slider";
import React from "react";
import { Text, View } from "react-native";
import CommonStyles, { themeInteractiveTextColor } from "./CommonStyles";

export default function SliderField({
  styles,
  setFieldValue,
  value,
  minLabel,
  maxLabel,
  type,
  name,
}) {
  if (type !== "slider") {
    return null;
  }
  return (
    <>
      <Text style={styles.sliderValue}>{value}</Text>

      <Slider
        name={name}
        onValueChange={(value) => setFieldValue(name, value)}
        onBlur={(value) => setFieldValue(name, value)}
        value={value}
        style={{ height: 40 }}
        minimumValue={0}
        maximumValue={10}
        step={1}
        minimumTrackTintColor={themeInteractiveTextColor}
        maximumTrackTintColor="#000000"
        thumbTintColor={themeInteractiveTextColor}
      />
      <View
        style={[CommonStyles.flexRow, CommonStyles.flexJustifySpaceBetween]}
      >
        <Text>{minLabel}</Text>
        <Text>{maxLabel}</Text>
      </View>
    </>
  );
}
