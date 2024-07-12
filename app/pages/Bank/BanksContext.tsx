import { Dispatch, SetStateAction, createContext } from "react"

interface BanksContextType {
    edit: null | Object
    setEdit: Dispatch<SetStateAction<Object>>
}

export const banksContext = createContext<BanksContextType>({
    edit: null,
    setEdit: () => {}
})