import {View, StyleSheet, Button, Dimensions, TextInput, } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SignInForm } from "../Signing/SignIn"
import { SignUpForm } from "../Signing/SignUp"
import { createContext } from 'react';

const Tab = createBottomTabNavigator(); 
const screenWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
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
        width: screenWidth * 0.7, 
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
        width: screenWidth * 0.8
    }
}) 
export const styleContext = createContext(styles)

export const SignRoot = () =>{
    return (
    <styleContext.Provider value={styles}>
        <Tab.Navigator screenOptions={ { headerShown: false}}>
            <Tab.Screen name="SignIn" component={SignInForm}/>
            <Tab.Screen name="SignUp" component={SignUpForm}/>
        </Tab.Navigator>
    </styleContext.Provider>
    ); 
} 