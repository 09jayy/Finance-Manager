import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useContext } from "react"
import { View, Text } from "react-native"
import { homeContext } from "../Home/HomeContext"
import { Bank } from "../../types/types"
import { getBankData } from "../Bank/functions/banksPageFunction"
import { getTransactions } from "../Bank/functions/transactionFunctions"
import { ExpensesAndIncome, getOverallBalance, getSpending } from "./functions/functions"

export const Dashboard = () => {
    const {banks, transactions, setBanks, setTransactions} = useContext(homeContext)
    let expensesAndIncome: ExpensesAndIncome 
    let overallBalance: number

    useFocusEffect(useCallback(()=>{
        getBankData()
                .then( (data: Bank[]) => {
                    setBanks(data)
                })
        
        getTransactions().then(response => {
            if (!response.ok){
                return response.text().then(text => {throw new Error(text)})
            }

            return response.json()
        }).then(body => {
            setTransactions(body.reverse())
            getBankData()
                .then( (data: Bank[]) => {
                    setBanks(data)
                })
        }).catch( (error: Error) => {
            console.error(error.message)
        })

        expensesAndIncome = getSpending(transactions)

        console.log(expensesAndIncome)

        overallBalance = getOverallBalance(banks)

        console.log(overallBalance)
    },[]))

    return (
        <View>
            <Text>Dashboard</Text>
            <Text></Text>
        </View>
    )
}