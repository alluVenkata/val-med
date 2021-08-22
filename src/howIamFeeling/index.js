import { Formik } from "formik";
import * as yup from "yup";
import React from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CommonStyles, { darkGrey, greyBorder } from "../commom/CommonStyles";
import ButtonComponent from "../commom/ButtonComponent";
import FormField from "../commom/FormField";
import moment from "moment";
import { useState } from "react";
import LoadingOverlay from "../commom/LoadingOverlay";

const initialValues = {
  fatigue: 0,
  pain: 0,
  qol: 0,
  burden: 0,
  psaLevel: 0,
};

const fieldDetails = {
  fatigue: {
    label: "Fatigue",
    helpText: "Helptext for Fatigue",
    minLabel: "None",
    maxLabel: "Severe",
  },
  pain: {
    label: "Pain",
    helpText: "Helptext for Pain",
    minLabel: "None",
    maxLabel: "Severe",
  },
  qol: {
    label: "QoL",
    helpText: "Helptext for QoL",
    minLabel: "Well",
    maxLabel: "Not well",
  },
  burden: {
    label: "Burden",
    helpText: "Helptext for Burden",
    minLabel: "None",
    maxLabel: "Severe",
  },
  psaLevel: {
    label: "PSA Level",
    helpText: "Helptext for PSALevel",
    placeholder: "0",
  },
};

const isValidForm = (isValid, values) => {
  if (!isValid) {
    return isValid;
  }
  const isValidValues = Object.values(values).some((value) => value);
  if (!isValidValues) {
    return !!values.psaLevel;
  }
  return isValidValues;
};

export default function HowIamFeeling() {
  const [isLoading, setIsLoading] = useState(false);
  const [symptomsSaved, setSymptomsSaved] = useState(false);
  const saveSymptoms = async (symptoms, resetForm) => {
    try {
      setIsLoading(true);
      const response = await fetch("/symptoms/create", {
        method: "post",
        body: symptoms,
      });
      const json = await response.json();
      setIsLoading(undefined);
      setSymptomsSaved(true);
      resetForm();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  const loginValidationSchema = yup.object().shape({
    psaLevel: yup.number().typeError("Please enter numbers."),
  });
  return (
    <View style={[CommonStyles.container]}>
      <LoadingOverlay loading={isLoading} />
      <ScrollView style={CommonStyles.scrollViewContainer}>
        <View style={{ padding: 10 }}>
          <Text style={[CommonStyles.h1, { marginBottom: 20 }]}>
            How Iam Feeling
          </Text>
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
          <Formik
            validateOnMount={true}
            validationSchema={loginValidationSchema}
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) =>
              saveSymptoms(values, resetForm)
            }
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              isValid,
              dirty,
            }) => (
              <>
                <View style={CommonStyles.cardView}>
                  <FormField
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.psaLevel}
                    name="psaLevel"
                    label={fieldDetails.psaLevel.label}
                    helpText={fieldDetails.psaLevel.helpText}
                    placeholder={fieldDetails.psaLevel.placeholder}
                    type="text"
                    errors={errors.psaLevel}
                    keyboardType="number-pad"
                  />
                  <FormField
                    setFieldValue={setFieldValue}
                    value={values.fatigue}
                    name="fatigue"
                    label={fieldDetails.fatigue.label}
                    helpText={fieldDetails.fatigue.helpText}
                    minLabel={fieldDetails.fatigue.minLabel}
                    maxLabel={fieldDetails.fatigue.maxLabel}
                    type="slider"
                  />
                  <FormField
                    setFieldValue={setFieldValue}
                    value={values.pain}
                    name="pain"
                    label={fieldDetails.pain.label}
                    helpText={fieldDetails.pain.helpText}
                    minLabel={fieldDetails.pain.minLabel}
                    maxLabel={fieldDetails.pain.maxLabel}
                    type="slider"
                  />
                  <FormField
                    setFieldValue={setFieldValue}
                    value={values.qol}
                    name="qol"
                    label={fieldDetails.qol.label}
                    helpText={fieldDetails.qol.helpText}
                    minLabel={fieldDetails.qol.minLabel}
                    maxLabel={fieldDetails.qol.maxLabel}
                    type="slider"
                  />
                  <FormField
                    lastElement
                    setFieldValue={setFieldValue}
                    value={values.burden}
                    name="burden"
                    label={fieldDetails.burden.label}
                    helpText={fieldDetails.burden.helpText}
                    minLabel={fieldDetails.burden.minLabel}
                    maxLabel={fieldDetails.burden.maxLabel}
                    type="slider"
                  />
                </View>

                <ButtonComponent
                  onPress={handleSubmit}
                  disabled={
                    isLoading || !(isValidForm(isValid, values) && dirty)
                  }
                  type="primaryLight"
                >
                  {symptomsSaved && !dirty ? "Saved" : "Save"}
                </ButtonComponent>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
}

export const formStyles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    color: "red",
    alignSelf: "center",
    marginBottom: 10,
  },
  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  label: {
    fontSize: 16,
    color: "black",
  },
});
