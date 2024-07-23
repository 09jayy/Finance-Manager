import { Bank, Transaction } from "../../../types/types";

export type ExpensesAndIncome = {
    expenses: number,
    income: number
}

export type monthLabel = {
    label: string[]
    hidePointsAtIndex: number[]
}

export const getSpending = (transactions: Transaction[]): ExpensesAndIncome => {
    let expenses = 0
    let income = 0
    
    for(const transaction of transactions){
        if (transaction.pay > 0){
            income += transaction.pay
        } else {
            expenses += transaction.pay * -1
        }
    }
    
    return {
        expenses: expenses,
        income: income
    }
}

export const getOverallBalance = (banks: Bank[]): number => {
    let sum = 0
    for(const bank of banks){
        sum += bank.balance
    }
    return sum
}

export const getThisMonthIncomeOvertime = (transactions: Transaction[]) => {
    let income = [0,0,0,0,0,0,0,0,0,0,0,0]
    let maxIndex = 0
    const now = new Date()
    for(const transaction of transactions){
        const date = new Date(transaction.date.toString())
        if (date.getFullYear() === now.getFullYear()){
            if (transaction.pay > 0){
                income[date.getMonth()] += transaction.pay
                maxIndex = (maxIndex < date.getMonth()) ? date.getMonth() : maxIndex
            }
        }
    }
    return income.splice(0,maxIndex+1)
}

export const getThisMonthExpensesOvertime = (transactions: Transaction[]) => {
    let expenses = [0,0,0,0,0,0,0,0,0,0,0,0]
    let maxIndex = 0
    const now = new Date()
    for(const transaction of transactions){
        const date = new Date(transaction.date.toString())
        if (date.getFullYear() === now.getFullYear()){
            if (transaction.pay < 0){
                expenses[date.getMonth()] += transaction.pay * -1
                maxIndex = (maxIndex < date.getMonth()) ? date.getMonth() : maxIndex
            }
        }
    }
    return expenses.splice(0,maxIndex+1)
}

export const calculateMonthLabel = (transactions: Transaction[]): monthLabel => {
    const monthsArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const indexes = [0,1,2,3,4,5,6,7,8,9,10,11]
    const monthNow = new Date().getMonth()

    console.log(monthsArray.slice(0,monthNow+1))
    return {
        label: monthsArray.slice(0,monthNow+1),
        hidePointsAtIndex: indexes.slice(0,monthNow+1)
    }
}