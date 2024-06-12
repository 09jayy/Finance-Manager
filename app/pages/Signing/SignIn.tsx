import { useState, useContext } from 'react'
import {View, StyleSheet, Button, Dimensions, TextInput, Pressable, Text} from "react-native"
import { SignTemplate } from "./components/SignTemplate"
import { InputEmail } from "./components/InputEmail"
import { InputPassword } from "./components/InputPassword"
import { styles } from './StyleSheet'

export const SignInForm = ({navigation}: any) => {
    return ( 
        <SignTemplate prefixLink="Don't have an account?" linkText='Sign up' redirect={() => navigation.navigate("SignUp")}>
            <View style={styles.inputContainer}>
                <InputEmail style={styles.textInput}/>
                <InputPassword textStyle={styles.textInput}/>
            </View>
            <Pressable style={styles.btn}>
                <Text style={styles.btnText}>LOGIN</Text>
            </Pressable>
        </SignTemplate> 
    );
} 
