import {Request, Response} from "express"
import User, {IUser} from "../models/user"
import Bank, {bankSchema, IBank} from "../models/bank"
import Transaction from "../models/transaction"
import { Error as MongooseError } from "mongoose"

export const addBank = async (req: Request<{},{},{userId: String, name: String, balance: Number}>, res: Response): Promise<void> => {
    try {   
        const {name, balance} = req.body
        const userId: String = res.locals.userId

        const newBank = await Bank.create({
            name: name, 
            balance: balance
        })

        const user = await User.updateOne(
            {_id: userId},
            {$push: {banks: newBank}}
        )

        if (user.modifiedCount == 0){
            res.status(404).send("User not Found")
            return
        }

        res.status(200).send("Success")
    } catch (err){
        if (err instanceof MongooseError.CastError){
            res.status(400).send(err.message)
        } else {
            res.status(500).send(err)
        }
    } 
}

export const updateBank = async (req: Request<{},{},{userId: String, bankId: String, update: IBank}>, res: Response): Promise<void> => {
    try {
        const {bankId, update} = req.body
        const userId: String = res.locals.userId


        // Create object to set spesific fields
        const setObject = {} 
        for (const key in update){
            setObject[`banks.$.${key}`] = update[key]
        }

        // Get User
        const user = await User.updateOne({_id: userId, "banks._id": bankId}, {$set: setObject})

        if (user.modifiedCount == 0){
            if (user.matchedCount == 1) {
                res.status(400).send("Redundant Update")
                return
            } 
            res.status(404).send("User or Bank not Found")
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

export const deleteBank = async (req: Request<{},{},{userId: String, bankId: String}>, res: Response): Promise<void> => {
    try {
        const {bankId} = req.body
        const userId: String = res.locals.userId

        const user = await User.updateOne(
            {_id: userId, "banks._id": bankId},
            {$pull: {banks: {_id: bankId}}}
        )

        if (user.modifiedCount == 0) {
            res.status(404).send("User or Bank not found");
            return
        }

        res.status(200).send("Bank successfully deleted")
    } catch (err){
        if (err instanceof MongooseError.CastError){
            res.status(400).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
}
