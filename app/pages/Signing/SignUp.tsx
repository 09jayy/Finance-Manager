import { StyleContext } from "./StyleContext";
import { InputEmail } from "./components/InputEmail";
import {SignTemplate} from "./components/SignForm"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { useContext } from 'react'

const screenWidth: number = Dimensions.get("window").width; 

export const SignUpForm = ({navigation} : any) => {
    const styles = useContext(StyleContext)
    return (
        <SignTemplate prefixLink="Already have an Account?" linkText='Sign In' redirect={() => navigation.navigate("SignIn")} styles={styles}>
            <View>
            </View>
        </SignTemplate>
    )
}
