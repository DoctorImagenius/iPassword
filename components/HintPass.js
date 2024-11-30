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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HintPass() {
    let [newIdHint, setNnewIdHint] = useState("");
    let [newPasHint, setNewPasHint] = useState("");
    let [showRes, setShowRes] = useState(false);

    const { loginId, loginPassword, setIdHint, setPasswordHint, allPasswords } =
        useContext(AppData);

    async function saveHint() {
        const newData = {
            idHint: newIdHint,
            passHint: newPasHint,
            loginId: loginId,
            loginPassword: loginPassword,
            allPasswords: allPasswords,
        };
        const jsonData = JSON.stringify(newData);
        await AsyncStorage.setItem("iPassword", jsonData);
    }

    function setLoginHint() {
        setShowRes(true);
        setNnewIdHint("");
        setNewPasHint("");
        setIdHint(newIdHint);
        setPasswordHint(newPasHint);
        //saveHint();
        setTimeout(() => {
            setShowRes(false);
        }, 3000);
    }

    return (
        <View style={styles.main}>
            <MaterialCommunityIcons name="lock-reset" style={styles.icon} />
            <View style={styles.inerMain}>
                <Text style={styles.text}>Password Hint</Text>
                <TextInput
                    placeholder="Enter Login ID Hint"
                    style={[styles.inp]}
                    placeholderTextColor="lightgray"
                    onChangeText={(t) => setNnewIdHint(t)}
                    value={newIdHint}
                ></TextInput>
                <TextInput
                    placeholder="Enter Login Password Hint"
                    style={[styles.inp]}
                    placeholderTextColor="lightgray"
                    onChangeText={(t) => setNewPasHint(t)}
                    value={newPasHint}
                ></TextInput>
                {showRes ? (
                    <Text style={styles.resetText}>
                        Reset Hint Successfully...
                    </Text>
                ) : null}
                <TouchableOpacity style={styles.reset} onPress={setLoginHint}>
                    <MaterialIcons
                        name="published-with-changes"
                        size={24}
                        color="white"
                    />
                    <Text style={styles.ltext}>Change Hint</Text>
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
