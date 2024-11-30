import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { AppData } from "./ContextApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResetPass() {
    let [newId, setNewId] = useState("");
    let [newPass, setNewPass] = useState("");
    let [conPass, setConPass] = useState("");
    let [idColor, setIdColor] = useState("rgb(44, 129, 255)");
    let [passColor, setPassColor] = useState("rgb(44, 129, 255)");
    let [conColor, setConColor] = useState("rgb(44, 129, 255)");
    let [idError, setIdError] = useState(false);
    let [passError, setPassError] = useState(false);
    let [conError, setConError] = useState(false);
    let [showSucces, setShowSuccess] = useState(false);

    const { setLoginId, setLoginPassword, allPasswords, idHint, passwordHint } =
        useContext(AppData);

    async function savePassword() {
        setLoginId(newId);
        setLoginPassword(newPass);
        const newData = {
            idHint: idHint,
            passHint: passwordHint,
            loginId: newId,
            loginPassword: newPass,
            allPasswords: allPasswords,
        };
        const jsonData = JSON.stringify(newData);
        //await AsyncStorage.setItem("iPassword", jsonData);
    }

    function resetPassword() {
        setIdError(false);
        setPassError(false);
        setConError(false);
        setIdColor("rgb(44, 129, 255)");
        setPassColor("rgb(44, 129, 255)");
        setConColor("rgb(44, 129, 255)");
        if (newId.length <= 5) {
            setIdColor("red");
            setIdError(true);
        } else {
            setIdError(false);
            setIdColor("rgb(44, 129, 255)");
            if (newPass.length <= 7) {
                setPassColor("red");
                setPassError(true);
            } else {
                setPassError(false);
                setPassColor("rgb(44, 129, 255)");
                if (conPass !== newPass) {
                    setConError(true);
                    setConColor("red");
                } else {
                    savePassword();
                    setConError(false);
                    setConColor("rgb(44, 129, 255)");
                    setShowSuccess(true);
                    setNewId("");
                    setNewPass("");
                    setConPass("");
                    setTimeout(() => {
                        setShowSuccess(false);
                    }, 3000);
                }
            }
        }
    }

    return (
        <View style={styles.main}>
            <MaterialCommunityIcons name="lock-reset" style={styles.icon} />
            <View style={styles.inerMain}>
                <Text style={styles.text}>Reset Password</Text>
                <TextInput
                    placeholder="New ID"
                    style={[styles.inp, { borderColor: idColor }]}
                    placeholderTextColor="lightgray"
                    onChangeText={(t) => setNewId(t)}
                    value={newId}
                ></TextInput>
                <TextInput
                    placeholder="New Password"
                    style={[styles.inp, { borderColor: passColor }]}
                    placeholderTextColor="lightgray"
                    onChangeText={(t) => setNewPass(t)}
                    value={newPass}
                ></TextInput>
                <TextInput
                    placeholder="Confirm Password"
                    style={[styles.inp, { borderColor: conColor }]}
                    placeholderTextColor="lightgray"
                    onChangeText={(t) => setConPass(t)}
                    value={conPass}
                ></TextInput>
                {idError ? (
                    <Text style={styles.errorText}>At least 5 characters</Text>
                ) : null}
                {passError ? (
                    <Text style={styles.errorText}>At least 8 characters</Text>
                ) : null}
                {conError ? (
                    <Text style={styles.errorText}>Password not matched</Text>
                ) : null}
                {showSucces ? (
                    <Text style={styles.resetText}>
                        Reset Password Successfully...
                    </Text>
                ) : null}
                <TouchableOpacity style={styles.reset} onPress={resetPassword}>
                    <MaterialCommunityIcons
                        name="key-change"
                        size={24}
                        color="white"
                    />
                    <Text style={styles.ltext}>Reset</Text>
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
        textAlignVertical: "center",
        borderColor: "rgb(44, 129, 255)",
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
    },
    text: {
        color: "rgb(0, 255, 21)",
        fontSize: 30,
        textShadowColor: "black",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        marginBottom: 10,
    },
    inp: {
        color: "white",
        width: "100%",
        padding: 5,
        borderRadius: 10,
        paddingLeft: 15,
        paddingRight: 15,
        margin: 10,
        borderColor: "rgb(44, 129, 255)",
        borderWidth: 1,
    },
    reset: {
        backgroundColor: "rgb(44, 129, 255)",
        width: "100%",
        alignItems: "center",
        padding: 5,
        margin: 10,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    ltext: {
        color: "white",
        marginLeft: 20,
        fontSize: 15,
    },
    errorText: {
        color: "red",
    },
    resetText: {
        color: "rgb(0, 255, 21)",
    },
});
