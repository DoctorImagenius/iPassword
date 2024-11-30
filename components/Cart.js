import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AppData } from "./ContextApi";
import * as Clipboard from "expo-clipboard";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Cart({
    id = "No ID",
    password = "No password",
    note,
    realId,
}) {
    let [showPass, setShowPass] = useState(false);
    let [copyName, setCopyName] = useState("copy-outline");

    let { setDelData, setSelectedItemId, setUpData } = useContext(AppData);

    function deleteObj() {
        setSelectedItemId(realId);
        setDelData(true);
    }

    function updateObj() {
        setSelectedItemId(realId);
        setUpData(true);
    }

    function copyToClipboard() {
        Clipboard.setString(password);
        setCopyName("copy");
        setTimeout(() => {
            setCopyName("copy-outline");
        }, 1000);
    }

    return (
        <View style={styles.body}>
            <View style={styles.idBox}>
                <Text style={styles.idBoxText}>ID : </Text>
                <Text style={styles.idBoxId}>{id}</Text>
            </View>
            <View style={styles.passBox}>
                <Text style={styles.passBoxText}>Paswword : </Text>
                <Text
                    style={[
                        styles.passBoxapass,
                        { color: showPass ? "red" : "rgb(44, 129, 255)" },
                    ]}
                >
                    {showPass ? password : "**********"}
                </Text>
                <View style={styles.passBoxIconMain}>
                    {showPass ? (
                        <Entypo
                            name="eye"
                            style={styles.passBoxIconRed}
                            onPress={() => setShowPass(!showPass)}
                        />
                    ) : (
                        <Entypo
                            name="eye-with-line"
                            style={styles.passBoxIcon}
                            onPress={() => setShowPass(!showPass)}
                        />
                    )}
                    <Ionicons
                        name={copyName}
                        style={styles.passBoxIcon}
                        onPress={copyToClipboard}
                    />
                </View>
            </View>
            <View style={styles.noteBox}>
                <Text style={styles.noteBoxText}>Note : </Text>
                <Text style={styles.noteBoxNote}>{note}</Text>
            </View>
            <View style={styles.bottBox}>
                <TouchableOpacity style={styles.btnBox} onPress={updateObj}>
                    <MaterialIcons
                        name="security-update"
                        size={24}
                        color="white"
                    />
                    <Text style={styles.btnBoxTextUp}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnBox} onPress={deleteObj}>
                    <MaterialIcons name="delete" size={24} color="red" />
                    <Text style={styles.btnBoxTextDel}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "rgba(33, 40, 61, 0.5)",
        borderRadius: 10,
        borderColor: "rgb(44, 129, 255)",
        borderWidth: 1,
        padding: 5,
        margin: 20,
        marginBottom: 10,
        marginTop: 10,
    },
    idBox: {
        flexDirection: "row",

        borderBottomColor: "rgb(44, 129, 255)",
        borderBottomWidth: 1,
        padding: 5,
    },
    idBoxText: {
        color: "gray",
        fontSize: 15,
        maxWidth: "90%",
    },
    idBoxId: {
        color: "white",
        fontSize: 15,
    },
    passBox: {
        padding: 5,
        borderBottomColor: "rgb(44, 129, 255)",
        borderBottomWidth: 1,
        flexDirection: "row",

        justifyContent: "flex-start",
    },
    passBoxapass: {
        color: "rgb(0, 255, 21)",
        fontSize: 15,
        maxWidth: "60%",
    },
    passBoxText: {
        color: "gray",
        fontSize: 15,
    },
    passBoxIconMain: {
        flexDirection: "row",
        marginLeft: "auto",
    },
    passBoxIcon: {
        color: "rgb(44, 129, 255)",
        fontSize: 15,
        alignSelf: "center",
        marginLeft: 10,
    },
    passBoxIconRed: {
        color: "red",
        fontSize: 15,
        alignSelf: "center",
        marginLeft: 10,
    },
    noteBox: {
        flexDirection: "column",
        padding: 5,
        paddingBottom: 10,
        borderBottomColor: "rgb(44, 129, 255)",
        borderBottomWidth: 1,
    },
    noteBoxText: {
        color: "gray",
        fontSize: 15,
    },
    noteBoxNote: {
        color: "white",
        fontSize: 15,
        backgroundColor: "rgba(33, 40, 61, 1)",
        borderRadius: 10,
        borderColor: "rgb(44, 129, 255)",
        borderWidth: 1,
        padding: 10,
        marginTop: 5,
    },
    bottBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 5,
    },
    btnBox: {
        backgroundColor: "rgb(44, 129, 255)",
        width: "40%",
        alignItems: "center",
        padding: 5,
        margin: 10,
        borderRadius: 5,
        shadowColor: "white",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    btnBoxTextUp: {
        color: "white",
        marginLeft: 5,
        fontSize: 15,
    },
    btnBoxTextDel: {
        color: "red",
        marginLeft: 5,
        fontSize: 15,
    },
});
