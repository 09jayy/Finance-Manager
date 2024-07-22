import AsyncStorage from "@react-native-async-storage/async-storage"
import {API_URL} from "react-native-dotenv"
import { Bank, Transaction } from "../../../types/types"

const getBalanceForBanks = (transactions: Transaction[]): Map<string,number> => {
    let bankBalances: Map<string, number> = new Map()

    for(const transaction of transactions){
        if (bankBalances.has(transaction.bank)){
            const currentBalance = bankBalances.get(transaction.bank)
            currentBalance !== undefined && bankBalances.set(transaction.bank, currentBalance + transaction.pay)
        } else {
            bankBalances.set(transaction.bank, transaction.pay)
        }
    }
    return bankBalances
}

const assignBalance = (banks: Bank[],transactions: Transaction[]): Bank[] => {
    const balanceMap = getBalanceForBanks(transactions)
    return banks.map((bank)=>{bank.balance = balanceMap.get(bank._id) as number; return bank})
}


export const getBankData = async (transactions: Transaction[]): Promise<Bank[]> => {
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
        }).then( (banks: Bank[]) => {
            return assignBalance(banks, transactions)
        }).catch((error: Error) => {
            return []
        })
}