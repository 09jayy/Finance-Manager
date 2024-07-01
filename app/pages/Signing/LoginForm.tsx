import { useState, useContext, Dispatch, SetStateAction } from 'react'
import {View, Pressable, Text} from "react-native"
import { SignTemplate } from "./components/SignTemplate"
import { InputEmail } from "./components/InputEmail"
import { InputPassword } from "./components/InputPassword"
import { styles } from './StyleSheet'
import {API_URL} from "react-native-dotenv"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginContext} from "../../AppContext"

const storeJwt = async (token: string) => {
    try {
        await AsyncStorage.setItem("token", token)
        console.log("token stored")
    } catch (err) {
        console.log(err)
    }
}

const isEmailValid = (email: string): boolean => {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i
    return emailPattern.test(email)
}

const login = (email: string,password: string, setLoggedIn: Dispatch<SetStateAction<boolean>>, setErrorMsg: Dispatch<SetStateAction<string>>) => {
    console.log("EMAIL: " + email + "\n Password: " + password)

    /*
    VALIDATION
    */ 
    if (!isEmailValid(email)) { setErrorMsg("Invalid Email"); return }
    if (password.replace(/ /g,'') == "") { setErrorMsg("Invalid Password"); return}
    

    /*
        REQUEST API FOR LOGIN
    */
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    }

    console.log("MAKE REQUEST")
    fetch(`http://${API_URL}/finance-manager/users/login`, request)
        .then(response => {
            console.log(response.ok)
            if (!response.ok){
                throw new Error(`${response.status}`)
            }
            
            return response.json()
        }).then(async data => {
            await storeJwt(data)
            setLoggedIn(true)
        }).catch( (error: Error) => {
            if (error.message == "400"){
                setErrorMsg("Incorrect email or password")
            } else {
                setErrorMsg("Error Code: " + error.message)
            }
        })
}

export const LoginForm = ({navigation}: any) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const {setLoggedIn} = useContext(loginContext)

    return ( 
        <SignTemplate prefixLink="Don't have an account?" linkText='Sign up' redirect={() => navigation.navigate("Sign Up")}>
            <View style={styles.inputContainer}>
                <InputEmail style={styles.textInput} email={email} setEmail={setEmail}/>
                <InputPassword textStyle={styles.textInput} placeholder='Password...' showOption={true} password={password} setPassword={setPassword}/>
            </View>
            <Pressable style={styles.btn} onPress={() => login(email,password, setLoggedIn as Dispatch<SetStateAction<boolean>>, setErrorMsg)}>
                <Text style={styles.btnText}>LOGIN</Text>
            </Pressable>
            <Text style={styles.errorMsg}>{errorMsg}</Text>
        </SignTemplate> 
    );
} 
