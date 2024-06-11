import { StyleSheet, Dimensions } from "react-native"

const screenWidth = Dimensions.get("window").width

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'blue',
    },
    formContainer: {
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'purple',
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', 
    },
    inputContainer: {  
        borderWidth: 3,
        borderColor: 'red',
    },
    logo: {
        resizeMode: 'contain',
        width: 250,
        borderWidth: 3,
        borderColor: 'black',
        marginBottom: 20,  
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        padding: 5,
        paddingLeft: 10,
        margin: 1,
        fontSize: 16, 
    },
})