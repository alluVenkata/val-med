import React from "react";
import { View } from "react-native";
import { SYMPTOMS_FILTER } from ".";
import LoadingComponent from "../commom/LoadingComponent";
import BarChartComponent from "./BarChart";
import LineChartComponent from "./LineChart";

export default function graphComponent({
  isLoading,
  chartViewBy,
  symptomsData,
}) {
  if (isLoading) {
    return <LoadingComponent height={350} />;
  }
  return (
    <View>
      {chartViewBy === SYMPTOMS_FILTER.LATEST && symptomsData && (
        <BarChartComponent symptomsData={{ ...symptomsData }} />
      )}
      {chartViewBy === SYMPTOMS_FILTER.WEEK && symptomsData && (
        <LineChartComponent symptomsData={{ ...symptomsData }} />
      )}
      {chartViewBy === SYMPTOMS_FILTER.MONTH && symptomsData && (
        <LineChartComponent symptomsData={{ ...symptomsData }} />
      )}
      {chartViewBy === SYMPTOMS_FILTER.YEAR && symptomsData && (
        <LineChartComponent symptomsData={{ ...symptomsData }} />
      )}
    </View>
  );
}
