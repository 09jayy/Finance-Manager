import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_URL } from 'react-native-dotenv'

export type UserData = {
    name: string
    email: string
}

export const getUserData = async (): Promise<UserData> => {
    console.log("GET DATA")

    const token = await AsyncStorage.getItem("token")
    
    const request = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }

    const response = await fetch(`http://${API_URL}/finance-manager/users/get`, request)
    const data: UserData = await response.json()
    return data
}
