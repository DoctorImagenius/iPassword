import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppData = createContext();

export const ContextApi = ({ children }) => {
    let [loginId, setLoginId] = useState("");
    let [loginPassword, setLoginPassword] = useState("");
    let [allPasswords, setAllPasswords] = useState([]);
    let [idHint, setIdHint] = useState("");
    let [passwordHint, setPasswordHint] = useState("");

    let [delData, setDelData] = useState(false);
    let [selectedItemId, setSelectedItemId] = useState("");
    let [upData, setUpData] = useState(false);

    // Read data from AsyncStorage when the app is first opened
    async function readData() {
        let defaultData = {
            loginId: "Admin",
            loginPassword: "Admin",
            idHint: "Admin",
            passHint: "Admin",
            allPasswords: [],
        };
        try {
            const jsonValue = await AsyncStorage.getItem("iPassword");
            if (jsonValue === null) {
                // If no data is found, initialize with default values
                setLoginId(defaultData.loginId);
                setLoginPassword(defaultData.loginPassword);
                setIdHint(defaultData.idHint);
                setPasswordHint(defaultData.passHint);
                setAllPasswords(defaultData.allPasswords);
                const jsonData = JSON.stringify(defaultData);
                await AsyncStorage.setItem("iPassword", jsonData);
            } else {
                // If data is found, populate state with the stored values
                let data = JSON.parse(jsonValue);
                setLoginId(data.loginId);
                setLoginPassword(data.loginPassword);
                setAllPasswords(data.allPasswords);
                setIdHint(data.idHint);
                setPasswordHint(data.passHint);
            }
        } catch (e) {
            alert("Failed to read data");
        }
    }

    // Write data to AsyncStorage whenever any state changes
    async function writeData() {
        let obj = {
            loginId: loginId,
            loginPassword: loginPassword,
            idHint: idHint,
            passHint: passwordHint,
            allPasswords: allPasswords,
        };
        try {
            const dataObj = JSON.stringify(obj);
            await AsyncStorage.setItem("iPassword", dataObj);
        } catch (e) {
            alert("Failed to save data");
        }
    }

    // Read data on app start
    useEffect(() => {
        readData();
    }, []);

    // Automatically save data whenever any of the dependencies change
    useEffect(() => {
        writeData();
    }, [loginId, loginPassword, idHint, passwordHint]); // This ensures that whenever state changes, data is saved

    return (
        <AppData.Provider
            value={{
                loginId,
                setLoginId,
                loginPassword,
                setLoginPassword,
                idHint,
                setIdHint,
                passwordHint,
                setPasswordHint,
                allPasswords,
                setAllPasswords,
                delData,
                setDelData,
                selectedItemId,
                setSelectedItemId,
                upData,
                setUpData,
            }}
        >
            {children}
        </AppData.Provider>
    );
};
