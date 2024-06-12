import { styles } from "./StyleSheet";
import { InputEmail } from "./components/InputEmail";
import {SignTemplate} from "./components/SignTemplate"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { useContext } from 'react'

const screenWidth: number = Dimensions.get("window").width; 

export const SignUpForm = ({navigation} : any) => {
    return (
        <SignTemplate prefixLink="Already have an Account?" linkText='Login' redirect={() => navigation.navigate("Login")}>
            <View>
            </View>
        </SignTemplate>
    )
}
