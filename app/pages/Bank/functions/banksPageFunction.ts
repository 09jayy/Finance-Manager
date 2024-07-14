import AsyncStorage from "@react-native-async-storage/async-storage"
import {API_URL} from "react-native-dotenv"

export type Bank = {
    _id?: string
    name: string
    balance: number
}

type Banks = {
    banks: Bank[]
}

export const getBankData = async (): Promise<Bank[]> => {
    const token = await AsyncStorage.getItem("token")

    const request = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    return fetch(`http://${API_URL}/finance-manager/banks/get`, request)
        .then(response => {
            if (!response.ok){
                throw new Error(`${response.text()}`)
            }

            return response.json()
        }).then( (data: Banks) => {
            return data.banks
        }).catch((error: Error) => {
            return []
        })
}