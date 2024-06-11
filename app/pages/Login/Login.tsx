import { useState } from 'react'
import {View, StyleSheet, Button, Dimensions, TextInput} from "react-native"
import { NavigationProp } from "@react-navigation/native"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Template } from "../../components/LoginSignupForm"

const screenWidth: number = Dimensions.get("window").width; 

export const LoginForm = ({navigation} : any) => {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const linkURL = (navigation: NavigationProp<any>, page: string) => {
        navigation.navigate(page)
    }
    
    return (
        <Template prefixLink="Don't have an account?" linkText='Sign up' linkURL={() => linkURL(navigation, "SignUp")}>
            <View style= { styles.container }>
                <TextInput style = {styles.textInput} placeholder="Email"/>
                <View style={styles.passwordContainer}> 
                    <TextInput style = {styles.textInput} placeholder="Password" secureTextEntry = {!showPassword} value={password} onChangeText={setPassword}/>
                    <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} onPress={toggleShowPassword} color="#aaa" style={styles.icon} size={24}/>
                </View>
                <Button title="Log In"/>
            </View>
        </Template>
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
