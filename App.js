import "react-native-gesture-handler";
import * as React from "react";
import LoginScreen from "./src/login";
import SelfHelpScreen from "./src/selfHelp";
import ErrorScreen from "./src/error";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserAuthContext from "./src/context/UserAuth";
import server from "./server";
import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CommonStyles, {
  themeBackgroundColor,
  themeBackgroundColorLight,
  themeInteractiveTextColor,
} from "./src/commom/CommonStyles";
import UserHeader from "./src/commom/UserHeader";
import HowIFeelScreen from "./src/howIFeel";
import MyDetailsScreen from "./src/myDetails";
import DevicesScreen from "./src/devices";
import HowIamFeelingScreen from "./src/howIamFeeling";
import SendNoteScreen from "./src/sendNote";
import { Platform } from "react-native";

//Mock server - Todo explain properly.
server();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTabs = () => {
  //TODO: handle tab badge count using notifications context.
  // const {} = UserAuthContext
  return (
    <Tab.Navigator
      initialRouteName="SelfHelp"
      backBehavior="history"
      screenOptions={{
        // headerShown: false,
        tabBarActiveTintColor: themeInteractiveTextColor,
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        tabBarStyle: {
          height: Platform.OS === "ios" ? 100 : 80,
        },
        tabBarActiveBackgroundColor: themeBackgroundColorLight,
        header: ({ navigation, route, options }) => {
          // const title = getHeaderTitle(options, route.name);
          const noBack = ["SelfHelp"].includes(route.name);
          return <UserHeader noBack={noBack} navigation={navigation} />;
        },
      }}
    >
      <Tab.Screen
        name="SelfHelp"
        component={SelfHelpScreen}
        options={{
          // tabBarActiveBackgroundColor: tabBarActiveBackgroundColor,
          tabBarLabel: "Self Help",
          tabBarBadge: 3,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="help-with-circle" size={35} color={color} />
            // <MaterialCommunityIcons
            //   name="help"
            //   color={themeBackgroundColor}
            //   size={size}
            // />
          ),
        }}
      />
      <Tab.Screen
        name="HowIFeel"
        component={HowIFeelScreen}
        options={{
          tabBarLabel: "How I Feel",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="hand-holding-heart" size={35} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Devices"
        component={DevicesScreen}
        options={{
          tabBarLabel: "Devices",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="devices" size={35} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyDetails"
        component={MyDetailsScreen}
        options={{
          tabBarLabel: "My Details",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-details"
              size={35}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="HowIamfeeling"
        component={HowIamFeelingScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="SendNote"
        component={SendNoteScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <UserAuthContext>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="Error" component={ErrorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserAuthContext>
  );
}
