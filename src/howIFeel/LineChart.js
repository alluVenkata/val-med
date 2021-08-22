import React, { Fragment, useState } from "react";
import moment from "moment";
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Circle, Text } from "react-native-svg";
import {
  StyleSheet,
  View,
  Text as ReactText,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { SYMPTOM_COLORS, SYMPTOM_LABELS } from "./BarChart";
import { useMemo } from "react";

// const SYMPTOMS_COLORS = {
//   pain: "red",
//   fatigue: "blue",
//   qol: "green",
//   burden: "purple",
// };

const ToolTip = ({ dataSet, x, y }) => {
  const [showToolTip, setShowToolTip] = useState(false);
  // alert(JSON.stringify(data));
  // debugger;
  // console.log(data);
  // console.log(value);
  return dataSet.data.map((val, index) => (
    <Fragment key={index}>
      <Circle
        key={index}
        cx={x(index)}
        cy={y(val.value)}
        r={6}
        stroke={SYMPTOM_COLORS[dataSet.label]}
        fill={showToolTip ? SYMPTOM_COLORS[dataSet.label] : "white"}
        fillOpacity={0.5}
        strokeOpacity={0.5}
        onPress={() => setShowToolTip((bool) => !bool)}
      />
      {showToolTip && (
        <Text
          key={index}
          x={x(index)}
          y={y(val.value) - 12}
          fontSize={12}
          fill={SYMPTOM_COLORS[dataSet.label]}
          alignmentBaseline={"middle"}
          textAnchor={"middle"}
        >
          {val.value}
        </Text>
      )}
    </Fragment>
  ));
};

const Decorator = ({ x, y, data }) => {
  return data.map((dataSet, index) => {
    return (
      <ToolTip
        key={index}
        dataSet={dataSet}
        x={x}
        y={y}
        data={data}
        index={index}
      />
    );
  });
};

const LineChartComponent = ({ symptomsData }) => {
  const { data, xAxisData, yAxisData } = useMemo(() => {
    if (symptomsData?.symptoms?.length) {
      const data = SYMPTOM_LABELS.map((label) => {
        return {
          data: symptomsData.symptoms?.map((symptom) => ({
            value: Number(symptom[label.toLowerCase()]),
            date: symptom.time,
          })),
          svg: { stroke: SYMPTOM_COLORS[label] },
          label,
        };
      });
      const xAxisData = symptomsData?.symptoms?.map((symptom) => symptom.time);
      const yAxisData = symptomsData?.symptoms
        ?.map(({ time, ...rest }) => Object.values(rest))
        .flat(1);
      return { data, xAxisData, yAxisData };
    }
    return {};
  }, [symptomsData?.symptoms]);

  const axesSvg = { fontSize: 10, fill: "grey" };
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 40;
  if (!data) {
    return null;
  }
  return (
    <View>
      <View style={styles.legendView}>
        {data.map((symptom) => (
          <View key={symptom.label} style={styles.legend}>
            <View
              style={[
                styles.legendBox,
                {
                  backgroundColor: SYMPTOM_COLORS[symptom.label],
                },
              ]}
            />
            <ReactText style={{ color: "grey" }}>
              {" - "}
              {symptom.label}
            </ReactText>
          </View>
        ))}
      </View>
      <View style={{ padding: 20, flexDirection: "row" }}>
        <YAxis
          data={yAxisData}
          style={{ marginBottom: xAxisHeight }}
          contentInset={verticalContentInset}
          numberOfTicks={10}
          svg={axesSvg}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <LineChart
            style={{ height: 260 }}
            data={data}
            yAccessor={({ item }) => item.value}
            contentInset={{ top: 20, bottom: 10, left: 10, right: 10 }}
            svg={{
              strokeWidth: 2,
              strokeOpacity: 0.5,
            }}
            curve={shape.curveLinear}
          >
            <Decorator />
          </LineChart>
          <XAxis
            style={{
              marginHorizontal: -10,
              height: xAxisHeight,
              paddingTop: 5,
            }}
            data={xAxisData}
            formatLabel={(index) => moment(xAxisData[index]).format("D/M/YY")}
            contentInset={{ left: 20, right: 20 }}
            svg={{ ...axesSvg, rotation: 30, translateY: 20 }}
            // numberOfTicks={10}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  legendBox: {
    width: 15,
    height: 15,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    opacity: 0.7,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  legendView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
});

export default LineChartComponent;
