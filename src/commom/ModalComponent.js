import React, { useState } from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet } from "react-native";
import CommonStyles from "./CommonStyles";

export default function ModalComponent({
  title,
  children,
  setModalVisible,
  modalVisible,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
      presentationStyle="pageSheet"
      style={{ justifyContent: "center" }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.titleView}>
            <Text style={CommonStyles.h2}>{title}</Text>
            <TouchableOpacity
              style={[
                CommonStyles.button,
                CommonStyles.buttonLinkSecondary,
                { width: "auto" },
              ]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={CommonStyles.buttonTextLinkSecondary}>X</Text>
            </TouchableOpacity>
          </View>
          <View>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    // alignSelf: "center",
    // alignContent: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 10,
  },
  centeredView: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  titleView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
