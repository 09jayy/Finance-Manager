import {DetailsType} from "../DetailsForm"
import {isEmailValid, isPasswordValid, PasswordError} from "../../../functions/validation"
import { Dispatch, SetStateAction } from "react"


export const submitDetails = (details: DetailsType, setSubmitError: Dispatch<SetStateAction<string>>) => {
}