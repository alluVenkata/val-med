import React from "react";
import { Linking, StyleSheet, View } from "react-native";
import ButtonComponent from "../commom/ButtonComponent";
import CommonStyles from "../commom/CommonStyles";

const links = [
  {
    text: "NHS website",
    link: "https://example.com",
  },
  {
    text: "Prostate cancer resources",
    link: "https://example.com/prostate",
  },
  {
    text: "Contact local heatlth care center",
    link: "https://example.com/contact",
  },
  {
    text: "App FAQ and User guide",
    link: "https://example.com/faq",
  },
];

export default function UsefullLinks() {
  const handleLinkPress = (link) => {
    Linking.openURL(link);
  };
  return (
    <View style={[CommonStyles.cardView, styles.linksView]}>
      {links.map(({ link, text }) => (
        <ButtonComponent
          key={text}
          type="link"
          onPress={() => handleLinkPress(link)}
        >
          {text}
        </ButtonComponent>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  linksView: {
    alignItems: "flex-start",
    marginTop: 20,
  },
});
