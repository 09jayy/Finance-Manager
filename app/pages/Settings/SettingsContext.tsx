import {Dispatch, SetStateAction, createContext} from "react"
import { UserData } from "./functions"

interface AccountDetailsType {
    userData: UserData | null, 
    setUserData: Dispatch<SetStateAction<UserData>> | null
}

export const settingsContext = createContext<AccountDetailsType>({
    userData: null,
    setUserData: null
})