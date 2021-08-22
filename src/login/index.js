import { white } from "ansi-colors";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import TextInputComponent from "../commom/TextInputComponent";
import CommonStyles from "../commom/CommonStyles";
import ButtonComponent from "../commom/ButtonComponent";
import { useUserAuthContext } from "../context/UserAuth";
import { formStyles } from "../howIamFeeling";
import LoadingOverlay from "../commom/LoadingOverlay";

export default function App({ navigation }) {
  const { loading, setAuth, authToken, invalidCreds, setInvalidCreds } =
    useUserAuthContext();
  const [CHInumber, setCHInumber] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmitClick = () => {
    setAuth({ userName: CHInumber, password });
    setCHInumber("");
    setPassword("");
  };
  useEffect(() => {
    if (authToken) {
      navigation.navigate("HomeTabs");
    }
  }, [authToken]);
  useEffect(() => {
    if (CHInumber || password) {
      setInvalidCreds(false);
    }
  }, [CHInumber, password]);

  return (
    <View style={CommonStyles.container}>
      <LoadingOverlay loading={loading} />
      <View style={styles.logoWrapper}>
        <Image style={styles.image} source={require("../../assets/logo.png")} />
      </View>
      <View
        style={[CommonStyles.cardView, CommonStyles.displayFlexAlignCenter]}
      >
        <TextInputComponent
          key="CHINumber"
          placeholder="CHI number"
          onChange={setCHInumber}
          customStyles={CommonStyles.topVSpace20}
          value={CHInumber}
        />
        <TextInputComponent
          key="password"
          placeholder="Password"
          onChange={setPassword}
          secureTextEntry={true}
          value={password}
        />
        {invalidCreds && (
          <Text style={formStyles.errorText}>
            Invalid CHI number or password
          </Text>
        )}
        <ButtonComponent type="primary" onPress={handleSubmitClick}>
          SUBMIT
        </ButtonComponent>
        <Text style={styles.infoText}>
          Your CHI number and Password will be sent to you by post, text or
          email.
        </Text>
        <ButtonComponent type="link">
          Not received your details?
        </ButtonComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    marginBottom: 40,
    // height: "100%",
  },
  nodetailsButton: {
    height: 30,
    marginBottom: 30,
  },
  infoText: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  logoWrapper: {
    backgroundColor: "white",
    borderRadius: 75,
    height: 150,
    width: 150,
    padding: 10,
    marginBottom: 30,
  },
});
