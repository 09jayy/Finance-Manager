import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useContext, useState } from "react"
import { View, Text } from "react-native"
import { homeContext } from "../Home/HomeContext"
import { Bank } from "../../types/types"
import { getBankData } from "../Bank/functions/banksPageFunction"
import { getTransactions } from "../Bank/functions/transactionFunctions"
import { ExpensesAndIncome, getOverallBalance, getSpending } from "./functions/functions"

export const Dashboard = () => {
    const {banks, transactions, setBanks, setTransactions} = useContext(homeContext)
    const [expensesAndIncome, setExpensesAndIncome] = useState({} as ExpensesAndIncome) 
    const [overallBalance, setOverallBalance] = useState(0)

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

        setExpensesAndIncome(getSpending(transactions))

        setOverallBalance(getOverallBalance(banks))
    },[]))

    return (
        <View>
            <Text>Dashboard</Text>
            <Text>{overallBalance}</Text>
        </View>
    )
}