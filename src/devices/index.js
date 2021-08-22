import React, { useState } from "react";
import {
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonComponent from "../commom/ButtonComponent";
import ChartTabs from "../commom/ChartTabs";
import CommonStyles, {
  themeInteractiveTextColor,
} from "../commom/CommonStyles";

import { useEffect } from "react";
import BottomTabsComponent from "../howIFeel/BottomTabs";
import { useIsFocused } from "@react-navigation/native";
import { SYMPTOMS_FILTER } from "../howIFeel";
import { createAlert } from "../commom/Alert";
import ModalComponent from "../commom/ModalComponent";
import DevicesComponent from "./DevicesComponent";

const MY_REPORTS_TAB = "myReports";
// const MY_NOTES_TAB = "myNotes";

export default function Devices({ navigation }) {
  const [chartViewBy, setChartViewBy] = useState(SYMPTOMS_FILTER.LATEST);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [symptomsData, setSymptomsData] = useState();
  const isFocused = useIsFocused();
  const getSymptomsData = async ({ isPrev, isNext, currentDate, tab }) => {
    try {
      setIsLoading(true);
      const response = await fetch("/symptoms", {
        method: "post",
        body: { range: tab || chartViewBy, isPrev, isNext, currentDate },
      });
      const json = await response.json();
      setSymptomsData(json._bodyInit);
      setIsLoading(false);
      if (tab) setChartViewBy(tab);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getSymptomsData({});
  }, [isFocused]);
  const handleTabChange = (tab) => {
    getSymptomsData({ tab });
  };
  return (
    <View style={[CommonStyles.container, styles.container]}>
      <ScrollView style={CommonStyles.scrollViewContainer}>
        <View style={{ padding: 10 }}>
          <ButtonComponent
            type="primaryLight"
            onPress={() => setModalVisible(true)}
          >
            Connect this app with my device
          </ButtonComponent>
          {/* <View style={styles.centeredView}> */}

          {/* </View> */}
          <View style={[CommonStyles.cardView, styles.chartCard]}>
            <>
              <ChartTabs onTabChange={handleTabChange} />
              <DevicesComponent />
            </>
          </View>
          {/* <BottomTabsComponent
            activeMainTab={activeMainTab}
            setActiveMainTab={setActiveMainTab}
          /> */}
        </View>
        <ModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <Text style={{ marginBottom: 20, fontSize: 16 }}>
            To connect this app with your other devices, please go to the app
            for your device and give permission for your data to be shared.
          </Text>
          <Text style={{ fontSize: 16 }}>
            Help can be found at
            <TouchableOpacity
              style={[
                CommonStyles.button,
                CommonStyles.buttonLink,
                { paddingLeft: 8 },
              ]}
              onPress={() => Linking.openURL("https://www.example.com")}
            >
              <Text style={[CommonStyles.buttonTextLink, {}]}>Press Here</Text>
            </TouchableOpacity>
          </Text>
        </ModalComponent>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  chartCard: {
    marginTop: 20,
    padding: 0,
    borderRadius: 15,
    overflow: "hidden",
    borderColor: themeInteractiveTextColor,
    borderWidth: 1,
  },
  tabsView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderColor: themeInteractiveTextColor,
    borderTopWidth: 1,
  },
});
