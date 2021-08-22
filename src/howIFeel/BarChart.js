import React from "react";
import { View } from "react-native";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { Text, Line } from "react-native-svg";
import * as scale from "d3-scale";
import { useMemo } from "react";

const CUT_OFF = 20;
const Labels = ({ x, y, bandwidth, data }) => {
  return (
    <>
      {data.map(({ value }, index) => (
        <Text
          key={index}
          x={x(index) + bandwidth / 2}
          y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
          fontSize={14}
          fill={value >= CUT_OFF ? "white" : "black"}
          alignmentBaseline={"middle"}
          textAnchor={"middle"}
        >
          {value}
        </Text>
      ))}
    </>
  );
};

const FATIGUE_LABEL = "Fatigue";
const PAIN_LABEL = "Pain";
const QOL_LABEL = "Qol";
const BURDEN_LABEL = "Burden";

export const SYMPTOM_LABELS = [
  FATIGUE_LABEL,
  PAIN_LABEL,
  QOL_LABEL,
  BURDEN_LABEL,
];
export const SYMPTOM_COLORS = {
  [FATIGUE_LABEL]: "blue",
  [PAIN_LABEL]: "red",
  [QOL_LABEL]: "green",
  [BURDEN_LABEL]: "orange",
};

export default function BarChartComponent({ symptomsData }) {
  const fill = "rgb(134, 65, 244)";
  const latestSymptoms = symptomsData?.symptoms;
  const data = useMemo(() => {
    if (latestSymptoms) {
      return SYMPTOM_LABELS?.map((label) => ({
        value: Number(latestSymptoms[label.toLowerCase()]),
        label,
        svg: {
          fill: SYMPTOM_COLORS[label],
        },
      }));
    }
  }, [symptomsData]);

  const xAxisHeight = 30;
  const axesSvg = { fontSize: 12, fill: "grey" };
  const verticalContentInset = { top: 10, bottom: 10 };
  if (!latestSymptoms) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={{ height: 300, flex: 1, margin: 20, flexDirection: "row" }}>
      <YAxis
        data={data}
        style={{ marginBottom: xAxisHeight }}
        contentInset={verticalContentInset}
        svg={axesSvg}
        formatLabel={(value) => value}
        yAccessor={({ item }) => item.value}
        numberOfTicks={5}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <BarChart
          style={{ flex: 1 }}
          data={data}
          svg={{ fill, fillOpacity: 0.7 }}
          contentInset={{ top: 30, bottom: 30 }}
          yAccessor={({ item }) => item.value}
          yMin={0}
        >
          {/* <Grid direction={Grid.Direction.HORIZONTAL} /> */}
          {/* <Line scaleX /> */}
          <Labels />
        </BarChart>
        <XAxis
          style={{
            marginHorizontal: -10,
            height: xAxisHeight,
          }}
          data={data}
          formatLabel={(_, index) => data[index].label}
          contentInset={{ left: 10, right: 10 }}
          svg={axesSvg}
          scale={scale.scaleBand}
        />
      </View>
    </View>
  );
}
