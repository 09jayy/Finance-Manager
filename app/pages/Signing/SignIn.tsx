import { useState, useContext } from 'react'
import {View, StyleSheet, Button, Dimensions, TextInput} from "react-native"
import { SignTemplate } from "./components/SignForm"
import { InputEmail } from "./components/InputEmail"
import { InputPassword } from "./components/InputPassword"
import { styles } from './StyleSheet'

export const SignInForm = ({navigation}: any) => {
    return ( 
        <SignTemplate prefixLink="Don't have an account?" linkText='Sign up' redirect={() => navigation.navigate("SignUp")}>
            <View style={styles.inputContainer}>
                <InputEmail style={styles.textInput}/>
                <InputPassword textStyle={styles.textInput}/>
                <Button title="Log In"/>
            </View>
        </SignTemplate> 
    );
} 
