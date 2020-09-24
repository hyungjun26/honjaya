import * as React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/Entypo";

import HomeScreen from "./screen/HomeScreen";
import AboutScreen from "./screen/AboutScreen";
import GuideScreen from "./screen/GuideScreen";
import ObjectRemoveScreen from "./screen/ObjectRemoveScreen";
import CameraView from "./components/CameraView";
import ResultScreen from "./screen/ResultScreen";

const HomeStack = createStackNavigator();
const AboutStack = createStackNavigator();
const GuideStack = createStackNavigator();
const RemoveStack = createStackNavigator();
const ResultStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#01A9DB",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="menu"
            size={25}
            backgroundColor="#01A9DB"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);

const AboutStackScreen = ({ navigation }) => (
  <AboutStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#01A9DB",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <AboutStack.Screen
      name="About"
      component={AboutScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="menu"
            size={25}
            backgroundColor="#01A9DB"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </AboutStack.Navigator>
);

const GuideStackScreen = ({ navigation }) => (
  <GuideStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#01A9DB",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <GuideStack.Screen
      name="Guide"
      component={GuideScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="menu"
            size={25}
            backgroundColor="#01A9DB"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </GuideStack.Navigator>
);

const RemoveStackScreen = ({ navigation }) => (
  <RemoveStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#01A9DB",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <RemoveStack.Screen
      name="Object Remove"
      component={ObjectRemoveScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="menu"
            size={25}
            backgroundColor="#01A9DB"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </RemoveStack.Navigator>
);

const ResultStackScreen = ({ navigation }) => (
  <ResultStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#01A9DB",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ResultStack.Screen
      name="Result"
      component={ResultScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="menu"
            size={25}
            backgroundColor="#01A9DB"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </ResultStack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="About" component={AboutStackScreen} />
        <Drawer.Screen name="Guide" component={GuideStackScreen} />
        <Drawer.Screen name="Object Remove" component={RemoveStackScreen} />
        <Drawer.Screen name="Camera" component={CameraView} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
