import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AppData } from "./ContextApi";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function AddPasswordScreen() {
    const [newId, setNewId] = useState("");
    const [newPass, setNewPass] = useState("");
    const [note, setNote] = useState("");
    let [idColor, setIdColor] = useState("rgb(44, 129, 255)");
    let [passColor, setPassColor] = useState("rgb(44, 129, 255)");
    let [idError, setIdError] = useState(false);
    let [passError, setPassError] = useState(false);
    let [showSucces, setShowSuccess] = useState(false);

    const {
        loginId,
        loginPassword,
        idHint,
        passwordHint,
        allPasswords,
        setAllPasswords,
    } = useContext(AppData);

    async function savePassword() {
        let data = [];
        data = allPasswords;
        const uniqueId = `${Date.now()}-${Math.random().toString(36)}`;
        data.push({
            realId: uniqueId,
            id: newId,
            password: newPass,
            note: note,
        });
        setAllPasswords(data);
        let obj = {
            loginId: loginId,
            loginPassword: loginPassword,
            idHint: idHint,
            passHint: passwordHint,
            allPasswords: data,
        };
        try {
            const dataObj = JSON.stringify(obj);
            await AsyncStorage.setItem("iPassword", dataObj);
        } catch (e) {
            alert("Failed to save data");
        }
    }

    function addPassword() {
        setIdError(false);
        setPassError(false);
        setIdColor("rgb(44, 129, 255)");
        setPassColor("rgb(44, 129, 255)");

        if (newId.length === 0) {
            setIdColor("red");
            setIdError(true);
        } else {
            setIdError(false);
            setIdColor("rgb(44, 129, 255)");
            if (newPass.length === 0) {
                setPassColor("red");
                setPassError(true);
            } else {
                setPassError(false);
                setPassColor("rgb(44, 129, 255)");
                savePassword();
                setShowSuccess(true);
                setNewId("");
                setNewPass("");
                setNote("");
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
            }
        }
    }

    return (
        <View style={styles.main}>
            <MaterialIcons name="add-shopping-cart" style={styles.icon} />
            <View style={styles.inerMain}>
                <Text style={styles.text}>Add New Password</Text>
                <TextInput
                    placeholder="Enter ID"
                    style={[styles.inp, { borderColor: idColor }]}
                    placeholderTextColor="lightgray"
                    onChangeText={setNewId}
                    value={newId}
                />
                <TextInput
                    placeholder="Enter Password"
                    style={[styles.inp, { borderColor: passColor }]}
                    placeholderTextColor="lightgray"
                    onChangeText={setNewPass}
                    value={newPass}
                />
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Write your note here..."
                    placeholderTextColor="gray"
                    onChangeText={setNote}
                    style={[styles.textArea]}
                    value={note}
                />
                {idError ? (
                    <Text style={styles.errorText}>Fill your ID!</Text>
                ) : null}
                {passError ? (
                    <Text style={styles.errorText}>Fill your Password</Text>
                ) : null}
                {showSucces ? (
                    <Text style={styles.resetText}>
                        Password Added Successfully...
                    </Text>
                ) : null}
                <TouchableOpacity style={styles.reset} onPress={addPassword}>
                    <MaterialIcons name="add" size={24} color="white" />
                    <Text style={styles.ltext}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "rgb(18, 22, 27)",
        justifyContent: "center",
    },
    icon: {
        color: "rgba(0, 255, 38, 0.1)",
        fontSize: 300,
        alignSelf: "center",
        position: "absolute",
        top: 150,
    },
    inerMain: {
        backgroundColor: "rgba(33, 40, 61, 0.5)",
        width: "80%",
        alignSelf: "center",
        alignItems: "center",
        borderColor: "rgb(44, 129, 255)",
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
    },
    text: {
        color: "rgb(0, 255, 21)",
        fontSize: 30,
        marginBottom: 10,
    },
    inp: {
        color: "white",
        width: "100%",
        padding: 5,
        borderRadius: 10,
        paddingLeft: 15,
        margin: 10,
        borderColor: "rgb(44, 129, 255)",
        borderWidth: 1,
    },
    textArea: {
        borderColor: "rgb(44, 129, 255)",
        color: "white",
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,

        textAlignVertical: "top",
        width: "100%",
    },
    errorText: {
        color: "red",
    },
    resetText: {
        color: "rgb(0, 255, 21)",
    },
    reset: {
        backgroundColor: "rgb(44, 129, 255)",
        width: "100%",
        alignItems: "center",
        padding: 5,
        margin: 10,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    ltext: {
        color: "white",
        marginLeft: 20,
        fontSize: 15,
    },
});
