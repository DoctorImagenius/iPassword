import React, { useEffect, useState } from "react";
import { StatusBar, View, Text, AppState, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "./components/Header";
import Login from "./components/Login";
import { ContextApi } from "./components/ContextApi";
import AddPasswordScreen from "./components/AddPasswordScreen";
import HomeScreen from "./components/HomeScreen";
import SettingsScreen from "./components/SettingsScreen";

const Tab = createMaterialTopTabNavigator();

export default function App() {
    let [openModalLogin, setOpenModalLogin] = useState(true);

    return (
        <ContextApi>
            <NavigationContainer>
                <StatusBar
                    hidden={false}
                    style="light"
                    backgroundColor="rgb(35, 40, 49)"
                />
                <Login
                    openModalLogin={openModalLogin}
                    setOpenModalLogin={setOpenModalLogin}
                />
                <Header
                    openModalLogin={openModalLogin}
                    setOpenModalLogin={setOpenModalLogin}
                ></Header>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color }) => {
                            let iconName;
                            if (route.name === "Home") {
                                iconName = "home";
                            } else if (route.name === "Add Password") {
                                iconName = "person-add";
                            } else if (route.name === "Settings") {
                                iconName = "settings";
                            }
                            return (
                                <Ionicons
                                    name={iconName}
                                    size={20}
                                    color={color}
                                />
                            );
                        },
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor: "rgb(35, 40, 49)",
                        },
                        tabBarActiveTintColor: "rgb(0, 255, 21)",
                        tabBarInactiveTintColor: "rgb(44, 129, 255)",
                        tabBarIndicatorStyle: {
                            backgroundColor: "rgb(0, 255, 21)",
                        },
                        showIcon: true,
                    })}
                >
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen
                        name="Add Password"
                        component={AddPasswordScreen}
                    />
                    <Tab.Screen name="Settings" component={SettingsScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </ContextApi>
    );
}
