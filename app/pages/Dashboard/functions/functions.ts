import { Bank, Transaction } from "../../../types/types";

export type ExpensesAndIncome = {
    expenses: number,
    income: number
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
    const now = new Date()
    for(const transaction of transactions){
        const date = new Date(transaction.date.toString())
        if (date.getFullYear() === now.getFullYear()){
            if (transaction.pay > 0){
                income[date.getMonth()] += transaction.pay
            }
        }
    }
    return income
}

export const getThisMonthExpensesOvertime = (transactions: Transaction[]) => {
    let expenses = [0,0,0,0,0,0,0,0,0,0,0,0]
    const now = new Date()
    for(const transaction of transactions){
        const date = new Date(transaction.date.toString())
        if (date.getFullYear() === now.getFullYear()){
            if (transaction.pay < 0){
                expenses[date.getMonth()] += transaction.pay * -1
            }
        }
    }
    return expenses
}