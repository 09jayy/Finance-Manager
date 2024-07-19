import {createContext, Dispatch, SetStateAction} from "react"
import { Bank, Transaction } from "../../types/types"

interface homeContextType {
    banks: Bank[] 
    setBanks: Dispatch<SetStateAction<Bank[]>>
    transactions: Transaction[]
    setTransactions: Dispatch<SetStateAction<Transaction[]>>
}

export const homeContext = createContext<homeContextType>({
    banks: [] as Bank[],
    setBanks: () => {},
    transactions: [] as Transaction[], 
    setTransactions: () => {}
})