import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CommonStyles, { themeBackgroundColor } from "../commom/CommonStyles";
import LoadingComponent from "../commom/LoadingComponent";

export default function DevicesComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState({});
  const getSymptomsData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/devices", {
        method: "post",
        body: { deviceId: "device1" },
      });

      const json = await response.json();
      setDeviceDetails(json.devices);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  useEffect(() => {
    getSymptomsData();
  }, []);
  if (isLoading) {
    return <LoadingComponent height={300} />;
  }
  return (
    <View>
      <View style={styles.watchView}>
        <Image source={require("../../assets/watchIcon.png")} />
        <View style={styles.watchDetails}>
          <Text style={CommonStyles.h2}>Smartwatch</Text>
          <Text style={CommonStyles.h2}>{deviceDetails?.deviceName}</Text>
          <Text>Last synced {deviceDetails.lastSynced} days ago</Text>
        </View>
      </View>
      <View style={styles.metersView}>
        {deviceDetails.meters?.map((meterDetails) => (
          <View key={meterDetails.count} style={styles.meter}>
            <LinearGradient
              colors={["#04B500", "#04B500", "white"]}
              style={styles.meterRadient}
            >
              <View style={styles.meterContent}>
                <Text style={styles.meterNumber}>{meterDetails.count}</Text>
                <Text>{meterDetails.measure}</Text>
              </View>
            </LinearGradient>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  watchView: {
    margin: 20,
    flexDirection: "row",
  },
  watchDetails: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  metersView: {
    padding: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  meter: {
    flexDirection: "row",
  },
  meterRadient: {
    borderColor: "#04B500",
    borderWidth: 2,
    height: 150,
    width: 150,
    borderRadius: 80,
  },
  meterContent: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  meterNumber: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 15,
  },
});
