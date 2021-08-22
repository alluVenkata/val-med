import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { greyBorder, themeInteractiveTextColor } from "../commom/CommonStyles";
import ButtonComponent from "../commom/ButtonComponent";
import moment from "moment";
import { SYMPTOMS_FILTER } from ".";

const getDateFormated = (date) => moment(date).format("DD MMM YYYY");

const getStartAndEndDates = (symptomsData, setStartDate, setEndDate) => {
  const startTime = symptomsData.symptoms[0].time;
  const endTime = symptomsData.symptoms[symptomsData.symptoms.length - 1].time;
  setStartDate(startTime);
  setEndDate(endTime);
  return `${getDateFormated(startTime)} - ${getDateFormated(endTime)}`;
};

export default function DateNavigateion({
  chartViewBy,
  symptomsData,
  getSymptomsData,
}) {
  console.log(symptomsData);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const formattedDate = useMemo(() => {
    if (symptomsData?.symptoms) {
      if (chartViewBy === SYMPTOMS_FILTER.LATEST) {
        console.log(symptomsData.symptoms?.time);
        setStartDate(symptomsData.symptoms?.time);
        return getDateFormated(symptomsData.symptoms?.time);
      } else if (symptomsData?.symptoms?.length) {
        return getStartAndEndDates(symptomsData, setStartDate, setEndDate);
      }
    }
    return "";
  }, [symptomsData?.symptoms, chartViewBy]);
  return (
    <View style={styles.dateControl}>
      <ButtonComponent
        type="linkSecondary"
        disabled={!symptomsData?.isPrev}
        onPress={() =>
          getSymptomsData({ currentDate: startDate, isPrev: true })
        }
      >
        <Entypo
          name="chevron-left"
          size={24}
          color={themeInteractiveTextColor}
        />
      </ButtonComponent>
      <Text>{formattedDate}</Text>
      <ButtonComponent
        type="linkSecondary"
        disabled={!symptomsData?.isNext}
        onPress={() =>
          getSymptomsData({
            currentDate:
              chartViewBy === SYMPTOMS_FILTER.LATEST ? startDate : endDate,
            isNext: true,
          })
        }
      >
        <Entypo
          name="chevron-right"
          size={24}
          color={themeInteractiveTextColor}
        />
      </ButtonComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  dateControl: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: greyBorder,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
