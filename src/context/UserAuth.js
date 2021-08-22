import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext, useEffect } from "react";
import { Text } from "react-native";

export const userContext = createContext();

const { Provider, Consumer } = userContext;

const UserAuthContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [authToken, setAuthToken] = useState();
  const [invalidCreds, setInvalidCreds] = useState(false);

  const getAuthState = async () => {
    try {
      setLoading(true);
      const response = await AsyncStorage.getItem("auth");
      const { token, userDetails } = JSON.parse(response);
      setAuthToken(token);
      setUserDetails(userDetails);
      setLoading(false);
    } catch (err) {
      setAuthToken(undefined);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);
  const setAuth = async ({ userName, password }) => {
    try {
      setLoading(true);
      const authResponse = await fetch("/user/login", {
        method: "post",
        body: {
          userName,
          password,
        },
      });
      const response = await authResponse.json();
      if (response._bodyInit === 409) {
        setLoading(false);
        return setInvalidCreds(true);
      }
      if (response && response.token) {
        console.log(response);
        await AsyncStorage.setItem("auth", JSON.stringify(response));
        setUserDetails(response.userDetails);
        setAuthToken(response.token);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const logOut = async (navigation) => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem("auth");
      setAuthToken(undefined);
      setUserDetails(undefined);
      setLoading(false);
      navigation.navigate("Login");
    } catch (err) {
      setLoading(false);
      setAuthToken(undefined);
    }
  };
  // if (isTokenExpired) {
  //   return <Error message="Your session has been expired!" />;
  // }
  return (
    <Provider
      value={{
        setAuth,
        authToken,
        userDetails,
        loading,
        logOut,
        invalidCreds,
        setInvalidCreds,
      }}
    >
      {children}
    </Provider>
  );
};

UserAuthContext.Consumer = Consumer;

export const useUserAuthContext = () => useContext(userContext);

// export default the component
export default UserAuthContext;
