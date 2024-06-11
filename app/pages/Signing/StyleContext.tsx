import { createContext } from "react" 
import { Dimensions } from "react-native"

const defaultStyles = {
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    inputContainer: {
        borderWidth: 3,
        borderColor: "red",
    },
    logo: {
        resizeMode: "contain",
        width: 100,  
        borderWidth: 3,
        borderColor: "black",
        alignItems: "center", 
    },
    textInput:{ 
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "black", 
        padding: 5, 
        paddingLeft: 10,
        margin: 1,
        fontSize: 16, 
        width: 100
    }
}

export const StyleContext = createContext(defaultStyles)