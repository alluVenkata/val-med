import { Alert } from "react-native";

export const createAlert = (title, message) =>
  Alert.alert(title, message, [], {
    cancelable: true,
    style: { borderRadious: 15 },
  });
