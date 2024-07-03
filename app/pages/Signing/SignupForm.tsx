import { styles } from "./StyleSheet";
import { InputEmail } from "./components/InputEmail";
import {SignTemplate} from "./components/SignTemplate"
import { View, Text, Pressable, TextInput } from "react-native"
import React, {useState} from "react"
import { InputPassword } from "./components/InputPassword";
import {createAccount} from "./functions/SignUpFunctions"

export const SignUpForm = ({navigation} : any) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    return (
        <SignTemplate prefixLink="Already have an account?" linkText='Login' redirect={() => navigation.navigate("Login")} errorMsg={errorMsg}>
            <View style={styles.inputContainer}>
                <TextInput style = {styles.textInput} placeholder="Name..." onChangeText={(value) => setName(value)} value={name}/>
                <InputEmail style={styles.textInput} email={email} setEmail={setEmail}/>
                <InputPassword textStyle={styles.textInput} showOption={true} placeholder="Password..." password={password} setPassword={setPassword}/>
                <InputPassword textStyle={styles.textInput} showOption = {false} placeholder="Confirm Password..." password={confirmPassword} setPassword={setConfirmPassword}/>
            </View>
            <Pressable style={styles.btn} onPress={() => createAccount(name, email, password, confirmPassword, setErrorMsg, () => navigation.navigate("Login"))}>
                <Text style={styles.btnText}>SIGN UP</Text>
            </Pressable>
        </SignTemplate>
    )
}
