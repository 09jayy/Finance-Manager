import { styles } from "./StyleSheet";
import { InputEmail } from "./components/InputEmail";
import {SignTemplate} from "./components/SignTemplate"
import { View, Text, Dimensions, Pressable } from "react-native"
import {Dispatch, SetStateAction, useState} from "react"
import { InputPassword } from "./components/InputPassword";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { isEmailValid, isPasswordValid, PasswordError } from "./functions/Validation";

const screenWidth: number = Dimensions.get("window").width; 

const createAccount = (email: string, password: string, confirmPassword: string, setErrorMsg: Dispatch<SetStateAction<string>>) => {
    console.log(`Email: ${email}\npassowrd: ${password}\nconfirm: ${confirmPassword}`)
    /*
        VALIDATION
    */
    if (!isEmailValid(email)) {setErrorMsg("Invalid Email"); return}

    let passwordValid: PasswordError = isPasswordValid(password)
    if (passwordValid.reason != null) {setErrorMsg(passwordValid.reason); return}

    if (password != confirmPassword) {setErrorMsg("Passwords do not match"); return}

    setErrorMsg("")
    
    /*
        REQUEST
    */
}

export const SignUpForm = ({navigation} : any) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    return (
        <SignTemplate prefixLink="Already have an account?" linkText='Login' redirect={() => navigation.navigate("Login")} errorMsg={errorMsg} setErrorMsg={setErrorMsg}>
            <View style={styles.inputContainer}>
                <InputEmail style={styles.textInput} email={email} setEmail={setEmail}/>
                <InputPassword textStyle={styles.textInput} showOption={true} placeholder="Password..." password={password} setPassword={setPassword}/>
                <InputPassword textStyle={styles.textInput} showOption = {false} placeholder="Confirm Password..." password={confirmPassword} setPassword={setConfirmPassword}/>
            </View>
            <Pressable style={styles.btn} onPress={() => createAccount(email, password, confirmPassword, setErrorMsg)}>
                <Text style={styles.btnText}>SIGN UP</Text>
            </Pressable>
        </SignTemplate>
    )
}
