import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CommonStyles, {
  greyBorder,
  secondaryTextColor,
} from "../commom/CommonStyles";
import LoadingComponent from "../commom/LoadingComponent";

export default function MyNotestTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [myNotesResponse, setMyNotesResponse] = useState([]);
  const isFocused = useIsFocused();
  const getMyNotes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/mynotes");
      const json = await response.json();
      setMyNotesResponse(json.notes.reverse());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  useEffect(() => {
    getMyNotes();
  }, [isFocused]);

  if (isLoading) {
    return <LoadingComponent height={350} />;
  }
  return (
    <View style={styles.notesView}>
      <Text style={[CommonStyles.h2, styles.heading]}>Recent Notes</Text>
      {myNotesResponse.map((notes) => (
        <View key={notes.id} style={styles.notesRowView}>
          <Text style={styles.timeStamp}>
            {moment(notes.time).format("DD-MM-YYY HH:mm")}
          </Text>
          <Text>{notes.message}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  notesView: {
    padding: 20,
  },
  heading: {
    marginBottom: 20,
  },
  notesRowView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.65,
    elevation: 4,
    borderWidth: 1,
    borderColor: greyBorder,
    borderRadius: 15,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "white",
  },
  timeStamp: {
    color: secondaryTextColor,
    fontSize: 12,
  },
});
