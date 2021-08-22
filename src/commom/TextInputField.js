import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { formStyles } from "../howIamFeeling";
import { themeInteractiveTextColor } from "./CommonStyles";

export default function TextInputField({
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
}) {
  if (type !== "text") {
    return null;
  }
  return (
    <View>
      <View style={styles.inputTextView}>
        <TextInput
          name={name}
          placeholder={placeholder}
          style={styles.inputText}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          value={value}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        <Text style={styles.inputUnits}>ng/ml</Text>
      </View>
      <Text style={formStyles.errorText}>{errors}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputTextView: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: themeInteractiveTextColor,
    width: 130,
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  inputText: {
    fontSize: 24,
    width: 50,
  },
  inputUnits: {
    fontSize: 20,
  },
});
