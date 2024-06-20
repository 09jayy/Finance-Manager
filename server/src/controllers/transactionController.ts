import {Request, Response} from "express"
import User, {IUser} from "../models/user"
import Transaction, {transactionSchema, ITransaction} from "../models/transaction"
import mongoose from "mongoose"
import { Error as MongooseError } from "mongoose"

export const addTransaction = async (req: Request<{},{},{id: String, transaction: ITransaction}>, res: Response): Promise<void> => {
    try {
        const transactionData: ITransaction = req.body.transaction
        const id: String = req.body.id

        const newTransaction = await Transaction.create({
            date: transactionData.date,
            transType: transactionData.transType,
            des: transactionData.des, 
            pay: transactionData.pay
        })

        const user = await User.findOne({_id: id})

        if (!user){
            res.status(404).send("User ID not found")
            return
        }

        user.transactions.push(newTransaction._id as mongoose.ObjectId);

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

export const deleteTransaction = async (req: Request<{},{}, {userId: String, transactionId: mongoose.Types.ObjectId}>, res: Response): Promise<void> => {
    try {
        const {userId, transactionId} = req.body

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
        const userId = req.body.userId

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