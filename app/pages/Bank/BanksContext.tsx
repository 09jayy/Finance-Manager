import { Dispatch, SetStateAction, createContext } from "react"

interface BanksContextType {
    editObject: Object
    setEditObject: Dispatch<SetStateAction<Object>>
    title: string
    setTitle: Dispatch<SetStateAction<string>>
}

export const banksContext = createContext<BanksContextType>({
    editObject: {},
    setEditObject: () => {},
    title: "",
    setTitle: () => {}
})