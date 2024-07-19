import {Request, Response} from "express"
import User, {IUser} from "../models/user"
import Transaction, {transactionSchema, ITransaction} from "../models/transaction"
import mongoose from "mongoose"
import { Error as MongooseError } from "mongoose"

export const addTransaction = async (req: Request<{},{},{id: String, transaction: ITransaction}>, res: Response): Promise<void> => {
    try {
        const transactionData: ITransaction = req.body.transaction
        const id: String = res.locals.userId

        const newTransaction = await Transaction.create({
            date: transactionData.date,
            name: transactionData.name,
            description: transactionData.description, 
            pay: transactionData.pay,
            bank: transactionData.bank
        })

        const user = await User.findOne({_id: id})

        if (!user){
            res.status(404).send("User ID not found")
            return
        }

        user.transactions.push(newTransaction._id as mongoose.ObjectId)

        // update the balance of the relevant bank the transaction is associated with 
        const bank = user.banks.find(bank => bank._id == transactionData.bank as Object)
        bank.balance = Number(bank.balance) + Number(transactionData.pay)

        await user.save() 

        res.status(201).send("Transaction added")
    } catch (err){
        if (err instanceof MongooseError.CastError){
            res.status(400).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
}

export const deleteTransaction = async (req: Request<{},{}, {transactionId: mongoose.Types.ObjectId}>, res: Response): Promise<void> => {
    try {
        console.log("Delete transaction")

        const {transactionId} = req.body
        const userId: String = res.locals.userId

        const transaction = await Transaction.deleteOne({_id: transactionId})

        if (transaction.deletedCount == 0){
            res.status(404).send("Transaction not Found")
            return
        }

        const user = await User.updateOne(
            {_id: userId, transactions: transactionId},
            {$pull: {transactions: transactionId}}
        )

        if (user.modifiedCount == 0){
            res.status(404).send("Transaction or User not Found in User Transactions")
            return
        }

        console.log(user)

        console.log(transaction)

        res.status(200).send("Transaction successfully deleted")
    } catch (err){
        if (err instanceof MongooseError.CastError){
            res.status(400).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
}

export const updateTransaction = async (req: Request<{},{},{transactionId: String, update: ITransaction}>, res: Response): Promise<void> => {
    try{
        const {transactionId, update} = req.body

        // Create object to set spesific fields
        const setObject = {} 
        for (const key in update){
            setObject[`${key}`] = update[key]
        }

        const transaction = await Transaction.updateOne({_id: transactionId}, {$set: setObject})    

        console.log(transaction)

        if (transaction.modifiedCount == 0){
            if (transaction.matchedCount == 1) {
                res.status(400).send("Redundant Update")
                return
            } 
            res.status(404).send("User or Transaction not Found")
            return
        }

        res.status(200).send("Update Successful")
    } catch (err){
        if (err instanceof MongooseError.CastError){
            res.status(400).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
}

export const getTransactions = async (req: Request<{},{},{userId: String}>, res: Response): Promise<void> => {
    try {
        const userId: String = res.locals.userId 

        const user = await User.findOne({_id: userId}).populate("transactions")

        console.log(user)

        if (user == null){
            res.status(404).send("User not Found")
            return
        }

        res.status(200).send(user.transactions)
    } catch (err){
        if (err instanceof MongooseError.CastError){
            res.status(400).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
}