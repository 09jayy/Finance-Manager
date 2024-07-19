import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_URL } from "react-native-dotenv"
import { removeBlank } from "../../../functions/dataFunctions"

export const updateBank = async (inputObject: Object, params: {bankId: string}): Promise<Response> => { 
    const update: Object = removeBlank(inputObject)
    const token = await AsyncStorage.getItem("token")
    const bankId = params.bankId

    const request = {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            update,
            bankId: bankId
        })
    }

    return fetch(`http://${API_URL}/finance-manager/banks/update`, request)
}

export const deleteBank = async (params: {bankId: string}): Promise<Response> => {
    const token = await AsyncStorage.getItem("token")

    const request = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            bankId: params.bankId
        })
    }

    return fetch(`http://${API_URL}/finance-manager/banks/delete`,request)
}

export const addBank = async (bank: Object) => {
    const token = await AsyncStorage.getItem("token")

    console.log(bank)

    const request = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            bank
        })
    }

    return fetch(`http://${API_URL}/finance-manager/banks/add`,request)
}