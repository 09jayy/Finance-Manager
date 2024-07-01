import { useState, useContext } from 'react'
import {View, Pressable, Text} from "react-native"
import { SignTemplate } from "./components/SignTemplate"
import { InputEmail } from "./components/InputEmail"
import { InputPassword } from "./components/InputPassword"
import { styles } from './StyleSheet'
import {API_URL} from "react-native-dotenv"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginContext} from "../../appContext"

const storeJwt = async (token: string) => {
    try {
        await AsyncStorage.setItem("token", token)
        console.log("token stored")
    } catch (err) {
        console.log(err)
    }
}

const login = (email: string,password: string, setLoggedIn: any, navHome: any) => {
    console.log("EMAIL: " + email + "\n Password: " + password)

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
            navHome()
        }).catch( (error: Error) => {
            if (error.message == "404"){
                console.log("user not found")
            }
        })
}

export const LoginForm = ({navigation}: any) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {loggedIn, setLoggedIn} = useContext(loginContext)

    return ( 
        <SignTemplate prefixLink="Don't have an account?" linkText='Sign up' redirect={() => navigation.navigate("Sign Up")}>
            <View style={styles.inputContainer}>
                <InputEmail style={styles.textInput} email={email} setEmail={setEmail}/>
                <InputPassword textStyle={styles.textInput} placeholder='Password...' showOption={true} password={password} setPassword={setPassword}/>
            </View>
            <Pressable style={styles.btn} onPress={() => login(email,password, setLoggedIn, () => navigation.navigate("Home"))}>
                <Text style={styles.btnText}>LOGIN</Text>
            </Pressable>
        </SignTemplate> 
    );
} 
