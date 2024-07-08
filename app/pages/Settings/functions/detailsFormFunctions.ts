import {DetailsType} from "../DetailsForm"
import {isEmailValid, isPasswordValid, PasswordError} from "../../../functions/validation"
import { Dispatch, SetStateAction } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_URL } from "react-native-dotenv"

const validInput = (details: DetailsType, setSubmitError: Dispatch<SetStateAction<string>>): boolean=> {
    setSubmitError("")

    if (details.email.length > 0 && !isEmailValid(details.email)) {setSubmitError("Invalid Email"); return false}
    
    if (details.newPassword.length > 0){
        let passwordValid = isPasswordValid(details.newPassword) 
        if (passwordValid.reason != null) {setSubmitError(passwordValid.reason); return false}
        if (details.newPassword != details.confirmPassword) {setSubmitError("New and Confirm Password do not match"); return false}
        if (details.currentPassword.length == 0 && details.newPassword.length > 0) {setSubmitError("Enter current password"); return false}
    }

    return true
}

const checkPassword = async (currentPassword: string, token: string): Promise<number> => {
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "password": currentPassword
        })
    }

    const response = await fetch(`http://${API_URL}/finance-manager/users/password`, request)

    return response.status
} 

const createUpdateJson = (details: DetailsType): object => {
    let update: { [key: string]: string } = {}

    for (let key in details) {
        if (details[key as keyof DetailsType] !== "") {
            update[key] = details[key as keyof DetailsType];
        }
    }

    return update
}

export const submitDetails = async (details: DetailsType, setSubmitError: Dispatch<SetStateAction<string>>, setSubmitSuccess: Dispatch<SetStateAction<string>>) => {
    setSubmitError("")
    if (validInput(details, setSubmitError) == false ) {return}
    const token = await AsyncStorage.getItem("token")

    // if password to be changed - check if current password is correct
    if (details.newPassword.length > 0){ 
        const code = checkPassword(details.currentPassword, token as string)
        
        if (await code == 400) { setSubmitError("Error 400: Incorrect Password"); return}
        if (await code == 500) { setSubmitError("Error 500: Server Error"); return}
    }

    const update = createUpdateJson(details)

    const request = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            update
        })
    }

    const response = await fetch(`http://${API_URL}/finance-manager/users/update`, request)
    
    if (await response.status == 400) { setSubmitError("Error 400: Incorrect Password"); return}
    if (await response.status == 500) { setSubmitError("Error 500: Server Error"); return}

    setSubmitSuccess("Update Successful")
}