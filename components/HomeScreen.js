import {
    FlatList,
    StyleSheet,
    Modal,
    View,
    Text,
    Button,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Cart from "./Cart";
import { AppData } from "./ContextApi";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
    let {
        loginId,
        loginPassword,
        idHint,
        passwordHint,
        allPasswords,
        setAllPasswords,
        delData,
        setDelData,
        selectedItemId,
        setSelectedItemId,
        upData,
        setUpData,
    } = useContext(AppData);

    let [upid, setUpId] = useState("");
    let [upPass, setUpPass] = useState("");
    let [upNote, setUpNote] = useState("");
    let [idColor, setIdColor] = useState("rgb(44, 129, 255)");
    let [passColor, setPassColor] = useState("rgb(44, 129, 255)");
    let [idError, setIdError] = useState(false);
    let [passError, setPassError] = useState(false);

    useEffect(() => {
        if (upData === true) {
            const updateableData = allPasswords.filter(
                (item) => item.realId === selectedItemId
            );
            setUpId(updateableData[0].id);
            setUpPass(updateableData[0].password);
            setUpNote(updateableData[0].note);
        }
    }, [upData]);

    const handleDelete = () => {
        const newData = allPasswords.filter(
            (item) => item.realId !== selectedItemId
        );
        setAllPasswords(newData);
        setDelData(false);
        setSelectedItemId("");
    };

    const handleCancel = () => {
        setDelData(false);
        setSelectedItemId(null);
    };

    const cencleUpdate = () => {
        setUpData(false);
        setSelectedItemId(null);
    };

    async function updateMobileStorage() {
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

    const doUpdate = () => {
        setIdError(false);
        setPassError(false);
        setIdColor("rgb(44, 129, 255)");
        setPassColor("rgb(44, 129, 255)");
        if (upid.length === 0) {
            setIdColor("red");
            setIdError(true);
        } else {
            setIdError(false);
            setIdColor("rgb(44, 129, 255)");
            if (upPass.length === 0) {
                setPassColor("red");
                setPassError(true);
            } else {
                setPassError(false);
                setPassColor("rgb(44, 129, 255)");
                setUpId("");
                setUpPass("");
                setUpNote("");
                setUpData(false);
                const updateableData = allPasswords.filter(
                    (item) => item.realId === selectedItemId
                );
                updateableData[0].id = upid;
                updateableData[0].password = upPass;
                updateableData[0].note = upNote;
                let UpdatedObj = [];
                UpdatedObj = updateableData[0];
                let preData = [];
                preData = allPasswords;
                let nextData = preData.map((item) => {
                    if (item.realId === UpdatedObj.id) {
                        return UpdatedObj;
                    }
                    return item;
                });
                setAllPasswords(nextData);
                updateMobileStorage();
            }
        }
    };

    return (
        <>
            <FlatList
                style={styles.container}
                data={allPasswords}
                renderItem={({ item }) => (
                    <Cart
                        id={item.id}
                        password={item.password}
                        note={item.note === "" ? "Nothing..." : item.note}
                        realId={item.realId}
                        onDelete={() => confirmDelete(item.realId)}
                    />
                )}
                keyExtractor={(item) => item.realId}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            There is no password right now!
                        </Text>
                    </View>
                )}
            />
            {delData && (
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={delData}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>
                                Are you sure to delete this?
                            </Text>
                            <View style={styles.buttonContainer}>
                                <Button title="Cancel" onPress={handleCancel} />
                                <Button
                                    title="Delete"
                                    onPress={handleDelete}
                                    color="red"
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}

            {upData && (
                <Modal transparent={true} animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.inerMain}>
                            <Text style={styles.text}>Update Data</Text>
                            <TextInput
                                placeholder="Enter ID"
                                style={[styles.inp, { borderColor: idColor }]}
                                placeholderTextColor="lightgray"
                                value={upid}
                                onChangeText={setUpId}
                            />
                            <TextInput
                                placeholder="Enter Password"
                                style={[styles.inp, { borderColor: passColor }]}
                                placeholderTextColor="lightgray"
                                value={upPass}
                                onChangeText={setUpPass}
                            />
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                placeholder="Write your note here..."
                                placeholderTextColor="gray"
                                style={[styles.textArea]}
                                value={upNote}
                                onChangeText={setUpNote}
                            />
                            {idError ? (
                                <Text style={styles.errorText}>
                                    Incomplete ID!
                                </Text>
                            ) : null}
                            {passError ? (
                                <Text style={styles.errorText}>
                                    Incomplete Password!
                                </Text>
                            ) : null}
                            <TouchableOpacity
                                style={styles.reset}
                                onPress={doUpdate}
                            >
                                <MaterialIcons
                                    name="update"
                                    size={24}
                                    color="white"
                                />
                                <Text style={styles.ltext}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.reset}
                                onPress={cencleUpdate}
                            >
                                <MaterialIcons
                                    name="cancel"
                                    size={24}
                                    color="white"
                                />
                                <Text style={styles.ltext}>Cencel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(18, 22, 27)",
        paddingTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: "rgb(18, 22, 27)",
        borderRadius: 20,
        alignItems: "center",
        borderColor: "red",
        borderWidth: 1,
    },
    modalText: {
        color: "white",
        fontSize: 18,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
    },

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
        backgroundColor: "rgb(18, 22, 27)",
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
        marginLeft: 5,
        fontSize: 15,
    },
    emptyText: {
        color: "rgb(44, 129, 255)",
        alignSelf: "center",
        borderColor: "rgb(44, 129, 255)",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
});
