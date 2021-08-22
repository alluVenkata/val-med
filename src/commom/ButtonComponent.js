import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CommonStyles from "./CommonStyles";

const buttonStyles = {
  primary: {
    button: CommonStyles.buttonPrimary,
    text: CommonStyles.buttonTextPrimary,
  },
  primaryLight: {
    button: CommonStyles.buttonPrimaryLight,
    text: CommonStyles.buttonTextPrimary,
  },
  secondary: {
    button: CommonStyles.buttonPrimary,
    text: CommonStyles.buttonTextPrimary,
  },
  link: {
    button: CommonStyles.buttonLink,
    text: CommonStyles.buttonTextLink,
  },
  linkSecondary: {
    button: CommonStyles.buttonLinkSecondary,
    text: CommonStyles.buttonTextLinkSecondary,
  },
  default: {
    button: CommonStyles.buttonDefault,
    text: CommonStyles.buttonTextDefault,
  },
};

export default function ButtonComponent({
  children,
  onPress,
  style,
  disabled = false,
  flush,
  type = "default",
}) {
  return (
    <TouchableOpacity
      style={[
        CommonStyles.button,
        buttonStyles[type].button,
        style,
        {
          minWidth: flush ? "auto" : undefined,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          CommonStyles.buttonText,
          buttonStyles[type].text,
          { opacity: disabled ? 0.5 : 1 },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
