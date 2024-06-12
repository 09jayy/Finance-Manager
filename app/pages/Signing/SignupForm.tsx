import { styles } from "./StyleSheet";
import { InputEmail } from "./components/InputEmail";
import {SignTemplate} from "./components/SignTemplate"
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native"
import { useContext } from 'react'
import { InputPassword } from "./components/InputPassword";

const screenWidth: number = Dimensions.get("window").width; 

export const SignUpForm = ({navigation} : any) => {
    return (
        <SignTemplate prefixLink="Already have an Account?" linkText='Login' redirect={() => navigation.navigate("Login")}>
            <View style={styles.inputContainer}>
                <InputEmail style={styles.textInput}/>
                <InputPassword textStyle={styles.textInput} showOption={false} placeholder="Password..."/>
                <InputPassword textStyle={styles.textInput} showOption = {false} placeholder="Confirm Password..."/>
            </View>
            <Pressable style={styles.btn}>
                <Text style={styles.btnText}>SIGN UP</Text>
            </Pressable>
        </SignTemplate>
    )
}
