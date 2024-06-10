import { useState } from 'react'
import {View, StyleSheet, Button, Dimensions, TextInput} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons";

const screenWidth: number = Dimensions.get("window").width; 

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")

    function toggleShowPassword(){
        setShowPassword(!showPassword)
    }
    
    return (
        <View style= { styles.container }>
            <TextInput style = {styles.textInput} placeholder="Email"/>
            <View style={styles.passwordContainer}> 
                <TextInput style = {styles.textInput} placeholder="Password" secureTextEntry = {!showPassword} value={password} onChangeText={setPassword}/>
                <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} onPress={toggleShowPassword} color="#aaa" style={styles.icon} size={24}/>
            </View>
            <Button title="Log In"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    logo: {
        resizeMode: "contain",
        width: screenWidth * 0.7
    },
    passwordContainer: {
    },
    textInput:{ 
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "black", 
        padding: 5, 
        paddingLeft: 10,
        margin: 1,
        fontSize: 16, 
        width: screenWidth * 0.7
    },
    icon:{  
        position: "absolute",
        top: 8, 
        right: 10,  
    }
});
