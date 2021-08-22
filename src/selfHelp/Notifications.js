import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import CommonStyles, {
  greyBorder,
  secondaryTextColor,
  themeBackgroundColor,
} from "../commom/CommonStyles";
import ButtonComponent from "../commom/ButtonComponent";
import LoadingOverlay from "../commom/LoadingOverlay";

export default function Notifications() {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState();
  const [showLess, setShowLess] = useState(true);
  const [notificaitons, setNotificaitons] = useState([]);
  const getNotifications = async (handleLoading = true) => {
    try {
      if (handleLoading) setLoading(true);
      const response = await fetch("/notifications");
      const json = await response.json();
      setNotificaitons(
        json.notifications.filter((notificaiton) => !notificaiton.closed)
      );
      if (handleLoading) setLoading(false);
    } catch (error) {
      if (handleLoading) setLoading(false);
      console.error(error);
    }
  };
  const deleteNotification = async (id) => {
    try {
      setDeleteLoading(id);
      const response = await fetch("/notifications", {
        method: "post",
        body: { id },
      });
      const json = await response.json();
      await getNotifications();
      setDeleteLoading(undefined);
    } catch (error) {
      setDeleteLoading(undefined);
      console.error(error);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);
  const hideNotifications = showLess && notificaitons.length >= 3;
  //   TODO: handle loading and show spinner
  //   if (loading) {
  //     return <Text>Fetching Notificaitons...</Text>;
  //   }
  if (!notificaitons.length && !loading) {
    return <Text>No Notificaitons.</Text>;
  }
  const handleSeeAllNotificaiotnsClick = () => {
    setShowLess((showLess) => !showLess);
  };
  return (
    <>
      <LoadingOverlay loading={loading} />
      <View style={styles.notificaitonContainer}>
        {notificaitons.map((notificaiton, index) => {
          if (showLess && index >= 3) {
            return null;
          }
          return (
            <View
              style={[
                CommonStyles.cardView,
                deleteLoading === notificaiton.id
                  ? CommonStyles.cardViewDisabled
                  : {},
              ]}
              key={notificaiton.time}
            >
              <View style={styles.notificationHeader}>
                <Text style={styles.timeStampStyle}>
                  {Moment(notificaiton.time).fromNow()}
                </Text>
                <ButtonComponent
                  type="linkSecondary"
                  onPress={() => deleteNotification(notificaiton.id)}
                  disabled={deleteLoading}
                >
                  X
                </ButtonComponent>
              </View>
              <Text>{notificaiton.message}</Text>
            </View>
          );
        })}
      </View>
      {hideNotifications && (
        <View style={styles.hideNotificationsView}>
          <LinearGradient
            colors={[
              "#ffffff00",
              themeBackgroundColor,
              themeBackgroundColor,
              themeBackgroundColor,
              themeBackgroundColor,
            ]}
            style={styles.hideNotificationsViewAbsolute}
          >
            <ButtonComponent
              type="primaryLight"
              onPress={handleSeeAllNotificaiotnsClick}
            >
              See all notificaitons
            </ButtonComponent>
          </LinearGradient>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  notificaitonContainer: {
    zIndex: 0,
  },
  notificationHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 12,
  },
  timeStampStyle: {
    color: secondaryTextColor,
    marginBottom: 10,
  },
  hideNotificationsView: {
    width: "100%",
    zIndex: 1,
    // position: "absolute",
    // top: 0,
    // marginTop: -100,
    // alignItems: "center",
    // justifyContent: "center",
  },
  hideNotificationsViewAbsolute: {
    padding: 30,
    width: "100%",
    position: "absolute",
    // top: 0,
    // backgroundColor: themeBackgroundColor,

    top: -75,

    // marginTop: -100,
    zIndex: 9999999,
  },
});
