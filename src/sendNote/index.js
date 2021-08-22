import { useIsFocused } from "@react-navigation/native";
import { Formik } from "formik";
import moment from "moment";
import React from "react";
import { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import ButtonComponent from "../commom/ButtonComponent";
import CommonStyles from "../commom/CommonStyles";
import FormField from "../commom/FormField";
import LoadingOverlay from "../commom/LoadingOverlay";
import { formStyles } from "../howIamFeeling";
import SuccessfulNote from "./SuccessfulNote";

const MAX_NOTE_LENGTH = 250;

export default function SendNote() {
  const [isLoading, setIsLoading] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);
  const [notes, setNotes] = useState("");
  const sendNotes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/mynotes", {
        method: "post",
        body: { notes },
      });
      const json = await response.json();
      setIsLoading(undefined);
      setNotesSaved(true);
      setNotes("");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {
      setNotesSaved(false);
    };
  }, []);
  const isFocused = useIsFocused();
  useEffect(() => {
    setNotesSaved(false);
  }, [isFocused]);

  return (
    <View style={[CommonStyles.container]}>
      <LoadingOverlay loading={isLoading} />
      <ScrollView style={CommonStyles.scrollViewContainer}>
        <View style={{ padding: 10 }}>
          <Text style={[CommonStyles.h1, { marginBottom: 20 }]}>
            Send a note
          </Text>
          {notesSaved ? (
            <SuccessfulNote />
          ) : (
            <>
              <View style={CommonStyles.cardView}>
                <View style={[formStyles.fieldRow, CommonStyles.borderBottom]}>
                  <Text style={formStyles.label}>Date</Text>
                  <Text>{moment().format("DD-MM-YYYY")}</Text>
                </View>
                <View style={formStyles.fieldRow}>
                  <Text style={formStyles.label}>Time</Text>
                  <Text>{moment().format("HH:mm")}</Text>
                </View>
              </View>
              <View style={CommonStyles.cardView}>
                <FormField
                  handleChange={setNotes}
                  // handleBlur={setNotes}
                  value={notes}
                  name="notes"
                  label="Note"
                  placeholder="Please enter the note"
                  type="textarea"
                  numberOfLines={10}
                  multiline
                  lastElement
                  max={MAX_NOTE_LENGTH}
                />
              </View>
              <ButtonComponent
                type="primaryLight"
                onPress={sendNotes}
                disabled={
                  isLoading ||
                  !(notes.length > 0 && notes.length < MAX_NOTE_LENGTH)
                }
              >
                Submit
              </ButtonComponent>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
