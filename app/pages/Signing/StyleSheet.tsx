import { StyleSheet, Dimensions } from "react-native"

const screenWidth = Dimensions.get("window").width

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {  
    },
    logo: {
        resizeMode: 'contain',
        marginBottom: 10,  
        width: 300
    },
    textInput: {
        padding: 5,
        paddingLeft: 10,
        margin: 3,
        fontSize: 16, 
        width: screenWidth * 0.7,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 6, 
    },
    btn: {
        marginTop: 10, 
        backgroundColor: "#1776e3",
        borderRadius: 5,  
        width: 230,
        height: 30,  
        justifyContent: "center",
        alignItems: "center"
    }, 
    btnText: {
        color: "white"
    },
    redirectText: {
        marginRight: 5
    }, 
    redirectLink: {
        color: "blue", 
    },
    redirectContainer: {
        flexDirection: "row", 
        marginTop: 5
    },
    errorMsg: {
        color: "#d12304", 
        marginTop: 2
    }
})