import { useState, useContext } from 'react'
import {View, StyleSheet, Button, Dimensions, TextInput, Pressable, Text} from "react-native"
import { SignTemplate } from "./components/SignTemplate"
import { InputEmail } from "./components/InputEmail"
import { InputPassword } from "./components/InputPassword"
import { styles } from './StyleSheet'

export const LoginForm = ({navigation}: any) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return ( 
        <SignTemplate prefixLink="Don't have an account?" linkText='Sign up' redirect={() => navigation.navigate("Sign Up")}>
            <View style={styles.inputContainer}>
                <InputEmail style={styles.textInput} email={email} setEmail={setEmail}/>
                <InputPassword textStyle={styles.textInput} placeholder='Password...' showOption={true} password={password} setPassword={setPassword}/>
            </View>
            <Pressable style={styles.btn} onPress={() => console.log("EMAIL: " + email + "\n Password: " + password)}>
                <Text style={styles.btnText}>LOGIN</Text>
            </Pressable>
        </SignTemplate> 
    );
} 
