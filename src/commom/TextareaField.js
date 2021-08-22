import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { formStyles } from "../howIamFeeling";
import { greyBorder, themeInteractiveTextColor } from "./CommonStyles";

export default function TextareaField({
  value,
  handleChange,
  handleBlur,
  type,
  errors,
  placeholder,
  name,
  keyboardType,
  multiline,
  numberOfLines,
  max,
}) {
  if (type !== "textarea") {
    return null;
  }
  return (
    <View>
      <TextInput
        name={name}
        placeholder={placeholder}
        style={styles.inputText}
        onChangeText={handleChange}
        onBlur={handleBlur}
        value={value}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      <Text
        style={[styles.charInfo, value.length > max && styles.charInfoError]}
      >
        {value.length}/{max} characters
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputTextView: {},
  inputText: {
    fontSize: 18,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    margin: 10,
    textAlignVertical: "top",
    height: 200,
  },
  charInfo: {
    alignSelf: "flex-end",
    color: greyBorder,
    // fontSize: 20,
  },
  charInfoError: {
    color: "red",
  },
});
