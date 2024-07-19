import AsyncStorage from "@react-native-async-storage/async-storage"
import dayjs from "dayjs"
import { API_URL } from "react-native-dotenv"

export type Transaction =  {
    _id: string
    date: dayjs.Dayjs
    name: string 
    description: string
    pay: number
    bank: string
}

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

export const deleteTransaction = async () => {
    return fetch("http")
}

export const updateTransaction = async (inputObject: Object, params: {selectedId: string}) => {
    console.log(inputObject)
    console.log(params.selectedId)
    
    return fetch("http")
}