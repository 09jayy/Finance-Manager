import { useState, useContext } from 'react'
import {View, StyleSheet, Button, Dimensions, TextInput} from "react-native"
import { SignTemplate } from "./components/SignForm"
import { InputEmail } from "./components/InputEmail"
import { InputPassword } from "./components/InputPassword"
import { styleContext } from './SignRoot'

export const SignInForm = ({navigation}: any) => {
    const styles = useContext(styleContext)

    return ( 
        <SignTemplate prefixLink="Don't hae an account?" linkText='Sign up' redirect={() => navigation.navigate("SignUp")} styles = {styles}>
            <View style={styles.inputContainer}>
                <InputEmail style={styles.textInput}/>
                <InputPassword textStyle={styles.textInput}/>
                <Button title="Log In"/>
            </View>
        </SignTemplate> 
    );
} 
