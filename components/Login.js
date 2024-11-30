import {
    View,
    Text,
    Modal,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Button,
    AppState,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { AppData } from "./ContextApi";

export default function Login({ openModalLogin, setOpenModalLogin }) {
    let [userId, setUserId] = useState("");
    let [userPass, setUserPass] = useState("");
    let [userColor, setUserColor] = useState("rgb(0, 102, 255)");
    let [passColor, setPassColor] = useState("rgb(0, 102, 255)");
    let [iconColor, setIconColor] = useState("rgb(44, 129, 255)");
    let [showPass, setShowPass] = useState(true);
    let [shoeHintModal, setShoeHintModal] = useState(false);
    let [passError, setPassError] = useState(false);

    let {
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
    } = useContext(AppData);

    function login() {
        if (userId === loginId && userPass === loginPassword) {
            setUserId("");
            setUserPass("");
            setUserColor("rgb(0, 102, 255)");
            setPassColor("rgb(0, 102, 255)");
            setPassError(false);
            setOpenModalLogin(false);
        } else {
            if (userId !== loginId) {
                setUserColor("red");
                setUserId("");
                setPassError(true);
            } else {
                setUserColor("rgb(0, 102, 255)");
            }
            if (userPass !== loginPassword) {
                setPassError(true);

                setPassColor("red");
                setUserPass("");
            } else {
                setPassColor("rgb(0, 102, 255)");
            }
        }
    }

    function hideShowPass() {
        if (showPass === true) {
            setShowPass(false);
            setIconColor("red");
        } else {
            setIconColor("rgb(44, 129, 255)");

            setShowPass(true);
        }
    }

    function showHint() {
        setShoeHintModal(true);
    }

    function handleCancel() {
        setShoeHintModal(false);
    }

    return openModalLogin ? (
        <>
            <Modal transparent={true} animationType="slide" visible={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>LOGIN</Text>
                        <TextInput
                            placeholder="Enter ID"
                            style={[styles.inp, { borderColor: userColor }]}
                            placeholderTextColor="lightgray"
                            onChangeText={(t) => setUserId(t)}
                            value={userId}
                        ></TextInput>
                        <View
                            style={[styles.mainInp, { borderColor: passColor }]}
                        >
                            <TextInput
                                placeholder="Enter Password"
                                style={{ color: "white", width: "80%" }}
                                placeholderTextColor="lightgray"
                                onChangeText={(t) => setUserPass(t)}
                                secureTextEntry={showPass}
                                value={userPass}
                            ></TextInput>
                            {showPass ? (
                                <Entypo
                                    name="eye-with-line"
                                    size={20}
                                    color={iconColor}
                                    style={{ alignSelf: "center" }}
                                    onPress={hideShowPass}
                                />
                            ) : (
                                <Entypo
                                    name="eye"
                                    size={20}
                                    color={iconColor}
                                    style={{ alignSelf: "center" }}
                                    onPress={hideShowPass}
                                />
                            )}
                        </View>
                        {passError ? (
                            <Text style={styles.errorText}>
                                Incorrect Id or Password!
                            </Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={login}
                        >
                            <Entypo name="login" size={20} color="white" />
                            <Text style={styles.text}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showHint}>
                            <Text style={styles.hint}>Hint</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {shoeHintModal && (
                <Modal transparent={true} animationType="fade">
                    <View style={styles.hintModalContainer}>
                        <View style={styles.hintModalContent}>
                            <Text style={styles.hintModalTextId}>
                                {
                                    <Text style={{ color: "gray" }}>
                                        ID Hint :{" "}
                                    </Text>
                                }{" "}
                                {idHint}
                            </Text>
                            <Text style={styles.hintModalTextPass}>
                                {
                                    <Text style={{ color: "gray" }}>
                                        Password Hint :
                                    </Text>
                                }{" "}
                                {passwordHint}
                            </Text>
                            <View style={styles.hintButtonContainer}>
                                <Button title="Cancel" onPress={handleCancel} />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    ) : null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 1)",
    },
    modalContent: {
        width: "90%",
        padding: 20,
        backgroundColor: "rgb(35, 40, 49)",
        borderRadius: 20,
        borderColor: "rgb(0, 102, 255)",
        borderWidth: 1,
        alignItems: "center",
        shadowColor: "blue",
        elevation: 200,
    },
    modalText: {
        fontSize: 50,
        color: "white",
        textShadowColor: "black",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    inp: {
        color: "white",
        width: "80%",
        padding: 5,
        backgroundColor: "rgb(35, 35, 35)",
        borderRadius: 10,
        paddingLeft: 15,
        paddingRight: 15,
        margin: 10,
        borderColor: "rgb(0, 102, 255)",
        borderWidth: 1,
    },
    mainInp: {
        color: "white",
        width: "80%",
        padding: 5,
        backgroundColor: "rgb(35, 35, 35)",
        borderRadius: 10,
        paddingLeft: 15,
        paddingRight: 15,
        margin: 10,
        borderColor: "rgb(0, 102, 255)",
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    error: {
        color: "red",
    },
    loginButton: {
        backgroundColor: "rgb(44, 129, 255)",
        width: "80%",
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
    text: {
        color: "white",
        marginLeft: 20,
        fontSize: 15,
    },
    hint: {
        color: "white",
        color: "rgb(44, 129, 255)",
        width: 50,
        textAlign: "center",
        borderColor: "rgb(44, 129, 255)",
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
    },

    hintContainer: {
        flex: 1,
        backgroundColor: "rgb(18, 22, 27)",
        paddingTop: 10,
    },
    hintModalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    hintModalContent: {
        width: 300,
        padding: 20,
        backgroundColor: "rgb(18, 22, 27)",
        borderRadius: 20,
        alignItems: "center",
        borderColor: "rgb(44, 129, 255)",
        borderWidth: 1,
    },
    hintModalTextId: {
        alignSelf: "flex-start",
        color: "rgb(44, 129, 255)",
        fontSize: 15,
    },
    hintModalTextPass: {
        alignSelf: "flex-start",
        color: "rgb(44, 129, 255)",
        fontSize: 15,
        marginBottom: 15,
    },
    hintButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
    },
    errorText: {
        color: "red",
    },
});
