import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useContext, useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native"
import { homeContext } from "../Home/HomeContext"
import { Bank } from "../../types/types"
import { getBankData } from "../Bank/functions/banksPageFunction"
import { getTransactions } from "../Bank/functions/transactionFunctions"
import { ExpensesAndIncome, getOverallBalance, getSpending, getThisMonthIncomeOvertime, getThisMonthExpensesOvertime, calculateMonthLabel, monthLabel } from "./functions/functions"
import { Widget } from "../../components/Widget"
import { TitleValueWidget } from "../../components/TitleValueWidget"
import { MinimalLineChart } from "./components/MinimalLineChart"

export const Dashboard = () => {
    const {banks, transactions, setBanks, setTransactions} = useContext(homeContext)
    const [expensesAndIncome, setExpensesAndIncome] = useState({expenses: 0, income: 0} as ExpensesAndIncome) 
    const [overallBalance, setOverallBalance] = useState(0)
    const [graphMonthLabel, setGraphMonthLabel] = useState({label: [""], hidePointsAtIndex: [0]} as monthLabel)

    //This month overtime states
    const [monthIncomeOvertimeData, setMonthIncomeOvertimeData] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
    const [monthExpensesOvertimeData, setMonthExpensesOvertimeData] = useState([0,0,0,0,0,0,0,0,0,0,0,0])

    /*
    This is the first page that opens when the app starts, therefore the transactions and banks will need to be fetched to display data for this screen at on initial startup 
    */
    useEffect(()=>{
        getBankData(transactions)
                .then( (data: Bank[]) => {
                    setBanks(data)
                })
        
        getTransactions().then(response => {
            if (!response.ok){
                return response.text().then(text => {throw new Error(text)})
            }

            return response.json()
        }).then(fetchedTransactions => {
            setTransactions(fetchedTransactions)
            getBankData(fetchedTransactions)
                .then( (data: Bank[]) => {
                    setBanks(data)
                })
        }).catch( (error: Error) => {
            console.error(error.message)
        })
    },[])

    useEffect(()=>{
        setExpensesAndIncome(getSpending(transactions))
        setMonthIncomeOvertimeData(getThisMonthIncomeOvertime(transactions))
        setMonthExpensesOvertimeData(getThisMonthExpensesOvertime(transactions))
        setGraphMonthLabel(calculateMonthLabel(transactions))
    },[transactions])

    useEffect(()=>{
        setOverallBalance(getOverallBalance(banks))
    },[banks])

    return (
        <ScrollView>
            <Widget showAdd={false} title="Overall Balance">
                <Text style={styles.overallBalanceText}>{(overallBalance >= 0) ? `£${overallBalance.toLocaleString()}` : `-£${overallBalance*-1}`}</Text>
            </Widget>

            <View style={{flexDirection: "row", justifyContent: "space-evenly", marginHorizontal: 25}}>
                <Widget showAdd={false} title="Income" styles={halfWidget}>
                    <Text style={styles.expensesIncomeText}>{`£${expensesAndIncome.income.toLocaleString()}`}</Text>
                    <Text style={styles.graphTitle}>This Year: </Text>
                    <MinimalLineChart 
                        labels={graphMonthLabel.label} 
                        hidePointsAtIndex={graphMonthLabel.hidePointsAtIndex} 
                        data={{data: monthIncomeOvertimeData}} 
                        width={Dimensions.get("window").width/3} 
                        height={200}
                    />
                </Widget>

                <Widget showAdd={false} title="Expenses" styles={halfWidget}>
                    <Text style={styles.expensesIncomeText}>{`£${expensesAndIncome.expenses.toLocaleString()}`}</Text>
                    <Text style={styles.graphTitle}>This Year: </Text>
                    <MinimalLineChart 
                        labels={graphMonthLabel.label} 
                        hidePointsAtIndex={graphMonthLabel.hidePointsAtIndex} 
                        data={{data: monthExpensesOvertimeData}} 
                        width={Dimensions.get("window").width/3} 
                        height={200}
                    />
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
    },
    graphTitle: {
        fontSize: 16,
        fontWeight: "500",
    },
    expensesIncomeText: {
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 10
    }
})