import {Request, Response} from "express"
import bcrypt from "bcrypt"
import User, {IUser} from "../models/user"
import Transaction, {transactionSchema, ITransaction} from "../models/transaction"
import mongoose from "mongoose"
import { InvalidIdFormatException } from "../exceptions"

export const addTransaction = async (req: Request<{},{},{id: String, transaction: ITransaction}>, res: Response): Promise<void> => {
    try {
        const transactionData: ITransaction = req.body.transaction
        const id: String = req.body.id

        const newTransaction = Transaction.create({
            date: transactionData.date,
            transType: transactionData.transType,
            des: transactionData.des, 
            pay: transactionData.pay
        })

        const user = await User.updateOne(
            {_id: id},
            { $push: {transactions: newTransaction}}
        )

        if (user.modifiedCount == 0){
            res.status(404).send("User ID not found")
            return
        }


        res.status(201).send("Transaction added")
    } catch (err){
        if (err instanceof InvalidIdFormatException){
            res.status(400).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
}

export const deleteTransaction = async (req: Request<{},{}, {userId: String, transactionId: String}>, res: Response): Promise<void> => {
    try {
        const {userId, transactionId} = req.body

        if (!mongoose.isValidObjectId(transactionId)){
            res.status(400).send("Invalid Transaction ID: " + transactionId)
            return
        }

        const user = await User.updateOne(
            {_id: userId}, 
            {$pull: {transactions: {_id: transactionId}}}
        )

        if (user.modifiedCount == 0) {
            res.status(404).send("User or Transaction not found");
            return
        }

        res.status(200).send("Transaction successfully deleted")
    } catch (err){
        if (err instanceof InvalidIdFormatException){
            res.status(400).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
}

export const updateTransaction = async (req: Request<{},{},{userId: String, transactionId: String, update: ITransaction}>, res: Response): Promise<void> => {
    try{
        const {userId, transactionId, update} = req.body

        // Create object to set spesific fields
        const setObject = {} 
        for (const key in update){
            setObject[`transactions.$.${key}`] = update[key]
        }

        // Get User
        const user = await User.updateOne({_id: userId, "transactions._id": transactionId}, {$set: setObject})

        if (user.modifiedCount == 0){
            if (user.matchedCount == 1) {
                res.status(400).send("Redundant Update")
                return
            } 
            res.status(404).send("User or Transaction not Found")
            return
        }

        res.status(200).send("Update Successful")
    } catch (err){
        if (err instanceof InvalidIdFormatException){
            res.status(400).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
}

export const getTransactions = async (req: Request<{},{},{userId: String}>, res: Response): Promise<void> => {
    try {
        const userId = req.body.userId

        const user = await User.findOne({_id: userId})

        if (user == null){
            res.status(404).send("User not Found")
            return
        }

        res.status(200).send(user.transactions)
    } catch (err){
        if (err instanceof InvalidIdFormatException){
            res.status(400).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
}