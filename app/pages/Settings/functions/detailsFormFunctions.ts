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

const createUpdateJson = (details: DetailsType): object => {
    let update: { [key: string]: string } = {}

    for (let key in details) {
        if (details[key as keyof DetailsType] !== "") {
            update[key] = details[key as keyof DetailsType];
        }
    }

    return update
}

export const submitDetails = async (details: DetailsType, setSubmitError: Dispatch<SetStateAction<string>>, setSubmitSuccess: Dispatch<SetStateAction<string>>): Promise<boolean> => {
    setSubmitError("")
    if (validInput(details, setSubmitError) == false ) {return false}
    const token = await AsyncStorage.getItem("token")

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

    return fetch(`http://${API_URL}/finance-manager/users/update`, request)
        .then(async response => {
            if (!response.ok){
                throw new Error(await response.text())
            }
            setSubmitSuccess("Update Successful")
            return true
        }).catch( (error: Error) => {
            setSubmitError(error.message)
            return false
        })
}