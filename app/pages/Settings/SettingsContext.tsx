import {Dispatch, SetStateAction, createContext} from "react"
import { UserData } from "./functions/rootFunctions"

interface AccountDetailsType {
    userData: UserData | null, 
    setUserData: Dispatch<SetStateAction<UserData>>
}

export const settingsContext = createContext<AccountDetailsType>({
    userData: null,
    setUserData: () => {} 
})