import {StyleSheet} from "react-native"

export const styles = StyleSheet.create({
    parent: {
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5, 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    header: {
        flexDirection: "row",
        marginBottom: 10
    },
    titleContainer: {
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    close: {
        marginLeft: "auto"
    },
    label: {
        fontSize: 18,
        margin: 5, 
        marginTop: 10
    },
    input: {
        fontSize: 16, 
        paddingLeft: 15,
        padding: 2,
    },
    controlContainer: {
        marginTop: 10,
        alignItems: "center"
    },
    errorMessage:{
        color: "#d12304",
        textAlign: "center",
        padding: 5
    },
    submitBtn: {
        backgroundColor: "#1776e3",
        borderRadius: 5,  
        width: 230,
        height: 30, 
        justifyContent: "center", 
        alignItems: "center",
        margin: 10 
    },
    submitText: {
        color: "white"
    },
    deleteBtn: {
        marginLeft: "auto",
        paddingTop: 20
    }
})