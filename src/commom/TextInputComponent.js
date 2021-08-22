import React from "react";
import { TextInput, View } from "react-native";
import CommonStyles from "./CommonStyles";

export default function TextInputComponent({
  placeholder,
  onChange,
  secureTextEntry,
  customStyles,
  value,
}) {
  return (
    <View style={[CommonStyles.inputView, customStyles]}>
      <TextInput
        style={CommonStyles.textInputStyle}
        placeholder={placeholder}
        placeholderTextColor="#C4C4C4"
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        value={value}
      />
    </View>
  );
}
