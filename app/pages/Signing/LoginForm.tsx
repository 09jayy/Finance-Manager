import { useState, useContext } from 'react'
import {View, StyleSheet, Button, Dimensions, TextInput, Pressable, Text} from "react-native"
import { SignTemplate } from "./components/SignTemplate"
import { InputEmail } from "./components/InputEmail"
import { InputPassword } from "./components/InputPassword"
import { styles } from './StyleSheet'
import {API_URL} from "react-native-dotenv"

const call = (email: string,password: string) => {
    console.log("EMAIL: " + email + "\n Password: " + password)

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: email,
        }),
    }

    fetch(`http://${API_URL}/finance-manager/test`, request)
        .then(response => {
            console.log(response.ok)
            if (!response.ok){
                throw new Error("http error")
            }
            
            return response.json()
        }).then(data => {
            console.log(data)
        }).catch(error => {
            console.log(error)
        })
}

export const LoginForm = ({navigation}: any) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return ( 
        <SignTemplate prefixLink="Don't have an account?" linkText='Sign up' redirect={() => navigation.navigate("Sign Up")}>
            <View style={styles.inputContainer}>
                <InputEmail style={styles.textInput} email={email} setEmail={setEmail}/>
                <InputPassword textStyle={styles.textInput} placeholder='Password...' showOption={true} password={password} setPassword={setPassword}/>
            </View>
            <Pressable style={styles.btn} onPress={() => call(email,password)}>
                <Text style={styles.btnText}>LOGIN</Text>
            </Pressable>
        </SignTemplate> 
    );
} 
