import { styles } from "./StyleSheet";
import { InputEmail } from "./components/InputEmail";
import {SignTemplate} from "./components/SignTemplate"
import { View, Text, Pressable, TextInput } from "react-native"
import React, {Dispatch, SetStateAction, useState} from "react"
import { InputPassword } from "./components/InputPassword";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { isEmailValid, isPasswordValid, PasswordError } from "./functions/Validation"
import {API_URL} from "react-native-dotenv"

const isAccountValid = (name: string, email: string, password: string, confirmPassword: string, setErrorMsg: Dispatch<SetStateAction<string>>): boolean => {
    if (name.replace(/ /g,'') == "") { setErrorMsg("Name must not be empty"); return false}
    
    if (!isEmailValid(email)) {setErrorMsg("Invalid Email"); return false}

    let passwordValid: PasswordError = isPasswordValid(password)
    if (passwordValid.reason != null) {setErrorMsg(passwordValid.reason); return false}

    if (password != confirmPassword) {setErrorMsg("Passwords do not match"); return false}

    setErrorMsg("")
    return true    
}

const createAccount = (name: string, email: string, password: string, confirmPassword: string, setErrorMsg: Dispatch<SetStateAction<string>>, redirect: () => {}) => {
    console.log(`Name: ${name}\nEmail: ${email}\npassowrd: ${password}\nconfirm: ${confirmPassword}`)
    /*
        VALIDATION
    */
    if (!isAccountValid(name, email, password, confirmPassword, setErrorMsg)) { return }

    /*
        REQUEST
    */
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email, 
            password: password, 
            name: name
        })
    }
    
    fetch(`http://${API_URL}/finance-manager/users`, request)
        .then(response => {
            console.log("response: " + response.ok)
            if (!response.ok){
                throw new Error(`${response.status}`)
            }
            redirect()
        }).catch( (error: Error) => {
            setErrorMsg(error.message)
        })
}

export const SignUpForm = ({navigation} : any) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    return (
        <SignTemplate prefixLink="Already have an account?" linkText='Login' redirect={() => navigation.navigate("Login")} errorMsg={errorMsg} setErrorMsg={setErrorMsg}>
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
