import { Dispatch, SetStateAction, createContext } from "react"

interface BanksContextType {
    editObject: Object
    setEditObject: Dispatch<SetStateAction<Object>>
}

export const banksContext = createContext<BanksContextType>({
    editObject: {},
    setEditObject: () => {}
})