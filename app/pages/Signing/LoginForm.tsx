import { useState, useContext } from 'react'
import {View, StyleSheet, Button, Dimensions, TextInput, Pressable, Text} from "react-native"
import { SignTemplate } from "./components/SignTemplate"
import { InputEmail } from "./components/InputEmail"
import { InputPassword } from "./components/InputPassword"
import { styles } from './StyleSheet'

export const LoginForm = ({navigation}: any) => {
    return ( 
        <SignTemplate prefixLink="Don't have an account?" linkText='Sign up' redirect={() => navigation.navigate("Sign Up")}>
            <View style={styles.inputContainer}>
                <InputEmail style={styles.textInput}/>
                <InputPassword textStyle={styles.textInput} placeholder='Password...' showOption={true}/>
            </View>
            <Pressable style={styles.btn}>
                <Text style={styles.btnText}>LOGIN</Text>
            </Pressable>
        </SignTemplate> 
    );
} 
