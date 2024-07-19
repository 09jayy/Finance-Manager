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