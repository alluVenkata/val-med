import { white } from "ansi-colors";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import TextInputComponent from "../commom/TextInputComponent";
import CommonStyles from "../commom/CommonStyles";
import ButtonComponent from "../commom/ButtonComponent";
import { useUserAuthContext } from "../context/UserAuth";

export default function Error({ message }) {
  return (
    <View style={CommonStyles.container}>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
