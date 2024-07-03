import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dispatch, SetStateAction } from 'react'
import { API_URL } from 'react-native-dotenv'
import { isEmailValid } from './Validation'

const storeJwt = async (token: string) => {
    try {
        await AsyncStorage.setItem("token", token)
        console.log("token stored")
    } catch (err) {
        console.log(err)
    }
}

export const login = (email: string,password: string, setLoggedIn: Dispatch<SetStateAction<boolean>>, setErrorMsg: Dispatch<SetStateAction<string>>) => {
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