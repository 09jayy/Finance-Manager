import AsyncStorage from "@react-native-async-storage/async-storage"
import {API_URL} from "react-native-dotenv"

export type Bank = {
    _id: string
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

const isNumeric = (n: string) => {
    return !isNaN(parseFloat(n))
}

// Keys in the object that are empty are values that have not been edited by the user so are removed
const removeBlank = (obj: {[key: string]: any}): Object => {
    let newObj: {[key: string]: any} = {} 

    Object.keys(obj).forEach(key => {
        if(obj[key] != ""){
            newObj[key] = (isNumeric(obj[key])) ? parseFloat(obj[key]) : obj[key]
        }
    })

    return newObj
}

export const updateBank = async (inputObject: Object, bankId: string): Promise<Response> => { 
    const update: Object = removeBlank(inputObject)
    const token = await AsyncStorage.getItem("token")

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