import AsyncStorage from "@react-native-async-storage/async-storage"
import dayjs from "dayjs"
import { API_URL } from "react-native-dotenv"
import { removeBlank } from "../../../functions/dataFunctions"

export const getTransactions = async (): Promise<Response> => {
    const token = await AsyncStorage.getItem("token")

    const request = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    return fetch(`http://${API_URL}/finance-manager/transactions/get`, request)
}

export const addTransaction = async (transaction: Object, params: {bankId: string}): Promise<Response> => {
    console.log(transaction)

    const bankId = params.bankId
    const token = await AsyncStorage.getItem("token")

    const request = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            transaction: {...transaction,bank: bankId}
        })
    }

    return fetch(`http://${API_URL}/finance-manager/transactions/add`,request)
}

export const deleteTransaction = async (params: {transactionId: string}) => {
    const token = await AsyncStorage.getItem("token")
    
    const request = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            transactionId: params.transactionId
        })
    }
    
    return fetch(`http://${API_URL}/finance-manager/transactions/delete`, request)
}

export const updateTransaction = async (inputObject: Object, params: {bankId: string, transactionId: string}) => {
    console.log(inputObject)
    console.log(params)
    const token = await AsyncStorage.getItem("token")
    const transactionUpdate = removeBlank(inputObject)
    
    console.log(transactionUpdate)

    const request = {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            transactionId: params.transactionId,
            update: transactionUpdate
        })
    }

    console.log(request)

    return fetch(`http://${API_URL}/finance-manager/transactions/update`, request)
}