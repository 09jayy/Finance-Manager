import { Dispatch, SetStateAction } from "react";
import { API_URL } from "react-native-dotenv";
import { isEmailValid, PasswordError, isPasswordValid } from "./Validation";

const isAccountValid = (name: string, email: string, password: string, confirmPassword: string, setErrorMsg: Dispatch<SetStateAction<string>>): boolean => {
    if (name.replace(/ /g,'') == "") { setErrorMsg("Name must not be empty"); return false}
    
    if (!isEmailValid(email)) {setErrorMsg("Invalid Email"); return false}

    let passwordValid: PasswordError = isPasswordValid(password)
    if (passwordValid.reason != null) {setErrorMsg(passwordValid.reason); return false}

    if (password != confirmPassword) {setErrorMsg("Passwords do not match"); return false}

    setErrorMsg("")
    return true    
}

export const createAccount = (name: string, email: string, password: string, confirmPassword: string, setErrorMsg: Dispatch<SetStateAction<string>>, redirect: () => {}) => {
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