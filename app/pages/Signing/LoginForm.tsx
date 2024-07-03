import { useState, useContext, Dispatch, SetStateAction } from 'react'
import {View, Pressable, Text} from "react-native"
import { SignTemplate } from "./components/SignTemplate"
import { InputEmail } from "./components/InputEmail"
import { InputPassword } from "./components/InputPassword"
import { styles } from './StyleSheet'
import {loginContext} from "../../AppContext"
import {login} from "./functions/LoginFunctions"

export const LoginForm = ({navigation}: any) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const {setLoggedIn} = useContext(loginContext)

    return ( 
        <SignTemplate prefixLink="Don't have an account?" linkText='Sign up' redirect={() => navigation.navigate("Sign Up")} errorMsg={errorMsg}>
            <View style={styles.inputContainer}>
                <InputEmail style={styles.textInput} email={email} setEmail={setEmail}/>
                <InputPassword textStyle={styles.textInput} placeholder='Password...' showOption={true} password={password} setPassword={setPassword}/>
            </View>
            <Pressable style={styles.btn} onPress={() => login(email,password, setLoggedIn as Dispatch<SetStateAction<boolean>>, setErrorMsg)}>
                <Text style={styles.btnText}>LOGIN</Text>
            </Pressable>
        </SignTemplate> 
    );
} 
