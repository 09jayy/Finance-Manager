import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_URL } from "react-native-dotenv"

export type Transaction =  {
    _id: string
    data: Date
    name: string 
    des: string
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