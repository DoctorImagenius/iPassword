import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Keyboard } from "react-native";
import ResetPass from "./ResetPass";
import HintPass from "./HintPass";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

export default function SettingsScreen() {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                setKeyboardVisible(true);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: "rgb(35, 40, 49)",
                    paddingBottom: 10, // Padding for the bottom of the tab bar
                    paddingTop: 10, // Padding for the top of the tab bar
                    height: 70, // Adjust the height as needed
                    borderRadius: 50, // Border radius for rounded corners
                    marginBottom: 10, // Add margin to the sides for better roundness
                    position: "absolute", // Ensures the tab bar floats above the screen
                    left: 10, // To align the bar with screen edges after adding borderRadius
                    right: 10, // Same as above for the right side
                    borderTopWidth: 0,
                    display: isKeyboardVisible ? "none" : "flex", // Hide the tab bar when keyboard is visible
                },
                tabBarActiveTintColor: "rgb(0, 255, 21)",
                tabBarInactiveTintColor: "rgb(44, 129, 255)",
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === "Reset Password") {
                        iconName = "lock-closed";
                    } else if (route.name === "Password Hint") {
                        iconName = "help-circle";
                    }
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
            })}
        >
            <Tab.Screen
                name="Reset Password"
                component={ResetPass}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Password Hint"
                component={HintPass}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
}
