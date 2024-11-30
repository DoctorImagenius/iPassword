import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Button,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Header({ openModalLogin, setOpenModalLogin }) {
    let [openModal, setOpenModal] = useState(false);

    function isLogout() {
        setOpenModal(true);
    }

    const handleLogout = () => {
        setOpenModal(false);
        setOpenModalLogin(true);
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    return (
        <>
            <View style={styles.mainContainer}>
                <Text style={styles.title}>iPassword</Text>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={isLogout}
                >
                    <AntDesign
                        name="logout"
                        size={20}
                        style={styles.logoutIcon}
                    />
                </TouchableOpacity>
            </View>
            {openModal && (
                <Modal transparent={true} animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>
                                Are you sure to logout?
                            </Text>
                            <View style={styles.buttonContainer}>
                                <Button title="Cancel" onPress={handleCancel} />
                                <Button
                                    title="LOGOUT"
                                    onPress={handleLogout}
                                    color="red"
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "rgb(35, 40, 49)",
        minHeight: 50,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "rgb(44, 129, 255)",
        textShadowColor: "black",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    logoutButton: {
        alignSelf: "center",
        backgroundColor: "rgb(53, 54, 68)",
        borderRadius: 50,
        padding: 8,
        shadowColor: "black",
        elevation: 5,
    },
    logoutIcon: {
        alignSelf: "center",
        color: "rgb(44, 129, 255)",
    },
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
        borderColor: "rgb(44, 129, 255)",
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
});
