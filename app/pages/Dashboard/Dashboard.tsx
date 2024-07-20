import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useContext, useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { homeContext } from "../Home/HomeContext"
import { Bank } from "../../types/types"
import { getBankData } from "../Bank/functions/banksPageFunction"
import { getTransactions } from "../Bank/functions/transactionFunctions"
import { ExpensesAndIncome, getOverallBalance, getSpending, getThisMonthIncomeOvertime } from "./functions/functions"
import { Widget } from "../../components/Widget"
import { TitleValueWidget } from "../../components/TitleValueWidget"

export const Dashboard = () => {
    const {banks, transactions, setBanks, setTransactions} = useContext(homeContext)
    const [expensesAndIncome, setExpensesAndIncome] = useState({expenses: 0, income: 0} as ExpensesAndIncome) 
    const [overallBalance, setOverallBalance] = useState(0)

    //This month overtime states
    const [monthIncomeOvertimeData, setMonthIncomeOvertimeData] = useState([0,0,0,0,0,0,0,0,0,0,0,0])

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
    },[]))

    useEffect(()=>{
        setExpensesAndIncome(getSpending(transactions))
        setMonthIncomeOvertimeData(getThisMonthIncomeOvertime(transactions))
    },[transactions])

    useEffect(()=>{
        setOverallBalance(getOverallBalance(banks))
    },[overallBalance])

    return (
        <ScrollView>
            <Widget showAdd={false} title="Overall Balance">
                <Text style={styles.overallBalanceText}>{`£${overallBalance.toLocaleString()}`}</Text>
            </Widget>

            <View style={{flexDirection: "row", justifyContent: "space-evenly", marginHorizontal: 25}}>
                <Widget showAdd={false} title="Income" styles={halfWidget}>
                    <Text>{`£${expensesAndIncome.income.toLocaleString()}`}</Text>
                </Widget>

                <Widget showAdd={false} title="Expenses" styles={halfWidget}>
                    <Text>{`£${expensesAndIncome.expenses.toLocaleString()}`}</Text>
                </Widget>
            </View>

        </ScrollView>
    )
}

const halfWidget = StyleSheet.create({
    widget: {
        marginHorizontal: 20,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20, 
        borderRadius: 10,
        backgroundColor: "white",
        width: "50%"
    }
})

const styles = StyleSheet.create({
    overallBalanceText: {
        fontSize: 20,
        fontWeight: "500"
    }
})