import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CommonStyles from "../commom/CommonStyles";

export default function SuccessfulNote() {
  return (
    <View style={[CommonStyles.cardView, CommonStyles.cardViewSuccess]}>
      <AntDesign
        style={styles.icon}
        name="checkcircle"
        size={34}
        color="green"
      />
      <Text style={styles.text}>Your Note has been sent.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  text: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
