import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ButtonComponent from "../commom/ButtonComponent";
import ChartTabs from "../commom/ChartTabs";
import CommonStyles, {
  themeInteractiveTextColor,
} from "../commom/CommonStyles";

import { useEffect } from "react";
import DateNavigateion from "./DateNavigateion";
import GraphComponent from "./GraphComponent";
import BottomTabsComponent from "./BottomTabs";
import MyNotestTab from "./MyNotestTab";
import { useIsFocused } from "@react-navigation/native";
import LoadingOverlay from "../commom/LoadingOverlay";

export const SYMPTOMS_FILTER = {
  LATEST: "latest",
  WEEK: "recentWeeks",
  MONTH: "recentMonths",
  YEAR: "recentYear",
};

const MY_REPORTS_TAB = "myReports";
// const MY_NOTES_TAB = "myNotes";

export default function HowIFeel({ navigation }) {
  const [chartViewBy, setChartViewBy] = useState(SYMPTOMS_FILTER.LATEST);
  const [activeMainTab, setActiveMainTab] = useState(MY_REPORTS_TAB);
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
            onPress={() => navigation.navigate("HowIamfeeling")}
          >
            Report how I am feeling now
          </ButtonComponent>
          <ButtonComponent
            type="primaryLight"
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate("SendNote")}
          >
            Send a note to health care staff
          </ButtonComponent>
          <View style={[CommonStyles.cardView, styles.chartCard]}>
            {activeMainTab === MY_REPORTS_TAB ? (
              <>
                <ChartTabs onTabChange={handleTabChange} />
                <GraphComponent
                  isLoading={isLoading}
                  chartViewBy={chartViewBy}
                  symptomsData={symptomsData}
                />
                <DateNavigateion
                  chartViewBy={chartViewBy}
                  symptomsData={symptomsData}
                  getSymptomsData={getSymptomsData}
                />
              </>
            ) : (
              <MyNotestTab />
            )}

            <BottomTabsComponent
              activeMainTab={activeMainTab}
              setActiveMainTab={setActiveMainTab}
            />
          </View>
        </View>
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
