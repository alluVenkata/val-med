import SliderField from "./SliderField";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, View } from "react-native";
import { formStyles } from "../howIamFeeling";
import CommonStyles, {
  darkGrey,
  themeInteractiveTextColor,
} from "./CommonStyles";
import TextInputField from "./TextInputField";
import TextareaField from "./TextareaField";
import { createAlert } from "./Alert";

export default function FormField(props) {
  const {
    setFieldValue,
    value,
    name,
    label,
    helpText,
    minLabel,
    maxLabel,
    lastElement,
    type,
  } = props;
  return (
    <View
      style={
        !lastElement
          ? [CommonStyles.borderBottom, { marginBottom: 20, paddingBottom: 20 }]
          : {}
      }
    >
      <View
        style={[CommonStyles.flexRow, CommonStyles.flexJustifySpaceBetween]}
      >
        <Text style={[formStyles.label]}>{label}</Text>
        {helpText && (
          <Entypo
            onPress={() => createAlert(label, helpText)}
            name="help-with-circle"
            size={24}
            color={themeInteractiveTextColor}
          />
        )}
      </View>
      <SliderField {...props} styles={styles} />
      <TextInputField {...props} styles={styles} />
      <TextareaField {...props} styles={styles} />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderValue: {
    fontSize: 20,
    alignSelf: "center",
    color: darkGrey,
  },
  thumb: {
    width: 50,
    height: 80,
    backgroundColor: themeInteractiveTextColor,
    borderBottomRightRadius: 100,
    borderTopRightRadius: 100,
  },
});
