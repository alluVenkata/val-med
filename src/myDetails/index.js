import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ButtonComponent from "../commom/ButtonComponent";
import CommonStyles, {
  themeInteractiveTextColor,
} from "../commom/CommonStyles";
import LoadingOverlay from "../commom/LoadingOverlay";
import { useUserAuthContext } from "../context/UserAuth";

export default function MyDetails({ navigation }) {
  const { logOut, loading, userDetails } = useUserAuthContext();
  if (!userDetails) {
    return null;
  }
  return (
    <View style={CommonStyles.container}>
      <LoadingOverlay loading={loading} />
      <ScrollView style={[CommonStyles.scrollViewContainer]}>
        <View style={styles.profileView}>
          <View style={styles.avatar}></View>
          <Text style={CommonStyles.h2}>{userDetails.name}</Text>
        </View>
        <View style={CommonStyles.cardView}>
          <View style={styles.cardRow}>
            <Text style={styles.cardRowLabel}>Name:</Text>
            <Text style={styles.cardRowValue}>{userDetails.name}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardRowLabel}>Age:</Text>
            <Text style={styles.cardRowValue}>{userDetails.age}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardRowLabel}>Address:</Text>
            <Text style={styles.cardRowValue}>{userDetails.address}</Text>
          </View>
        </View>
        <ButtonComponent type="primaryLight" onPress={() => logOut(navigation)}>
          Logout
        </ButtonComponent>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 100,
    width: 100,
    alignSelf: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: themeInteractiveTextColor,
    backgroundColor: "white",
  },
  profileView: {
    alignItems: "center",
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: "row",
    // justifyContent: "center",
  },
  cardRowLabel: {
    flex: 0.3,
    textAlign: "right",
    marginRight: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  cardRowValue: {
    flex: 0.7,
    fontSize: 18,
    alignSelf: "flex-start",
  },
});
