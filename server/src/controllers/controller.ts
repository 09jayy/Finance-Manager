import {Request, Response} from "express"
import bcrypt from "bcrypt"
import User, {IUser, ITransaction } from "../models/user"
import mongoose from "mongoose"
import { InvalidIdFormatException } from "../exceptions"

/*
    USER RELATED METHODS
*/
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try{
        const users = await User.find()
        res.status(200).json(users)
    } catch (err){
        res.status(500).json( { message: "Error fetching users", error: err})
    }
}

export const addUser = async (req: Request<{},{},{name: String, email: String, password: String}>, res: Response): Promise<void> => {
    try {
        // Checks if email already has an assigned user
        const userArr: Array<IUser> = await User.find().where({email: new RegExp(req.body.email.toString(), 'i')})
        if (userArr.length > 0){
            res.status(400).send("Email already has associated account")
            return
        }

        // Save user to database
        const {name, password, email} : {name: String, password: String, email: String} = req.body
        const hashedPassword: String = await bcrypt.hash(password, 10)
        const user = new User({
            email: email, 
            name: name,
            password: hashedPassword,
            balance: undefined, 
            transactions: new Array<ITransaction>,
            dateCreated: undefined,
            lastUpdated: undefined, 
        })

        const newUser = await user.save()
        res.status(201).send(newUser)
    } catch (err) {
        res.status(500).send({message: err.message})
    }
}

export const findUser = async (req: Request<{},{},{email: String, password: String}>, res: Response): Promise<void> => {
    try {
        const user: IUser | null = await User.findByEmail(req.body.email)

        if (user == null){
            res.status(404).send("User not found")
            return
        }

        if (await bcrypt.compare(req.body.password, user.password)){
            res.send("Success")
        } else {
            res.send("Incorrect")
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const deleteUser = async (req: Request<{},{}, {id: String}>, res: Response): Promise<void> => {
    try {
        const deletedUser: IUser | null = await User.findOneAndDelete({_id: req.body.id})

        if (deletedUser != null){
            res.status(200).send("id: " + req.body.id + " successfully deleted")
        } else {
            res.status(404).send("User _id: " + req.body.id + " not found")
        } 
    } catch (err){
        if (err instanceof InvalidIdFormatException){
            res.status(400).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
}

export const updateUser = async (req: Request<{},{},{ id: String, update: IUser}>, res: Response): Promise<void> => {
    try {
        const { id, update } : {id : String, update: IUser} = req.body;

        if (await User.findOne({_id: id}) == null){
            res.status(404).send("User ID: " + id + " not found")
            return
        }

        // User exists, update user
        const updatedUser: IUser | null = await User.findOneAndUpdate({_id: id}, update, { new: true });
        if (!updatedUser) {
            res.status(500).send("Failed to update user");
        } else {
            res.status(200).send("Update Successful");
        }

    } catch (err) {
        if (err instanceof InvalidIdFormatException){
            res.status(400).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
}

/*
    TRANSACTION RELATED METHODS
*/
export const addTransaction = async (req: Request<{},{},{id: String, transaction: ITransaction}>, res: Response): Promise<void> => {
    try {
        const transaction : ITransaction = req.body.transaction
        const id: String = req.body.id

        const user = await User.findOne({_id: id})

        if (user == null){
            res.status(404).send("User ID not found")
            return
        }

        user.transactions.push(transaction)

        await user.save()
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

        const user = await User.findOneAndUpdate(
            {_id: userId}, 
            {$pull: {transactions: {_id: transactionId}}}
        )

        if (user == null) {
            res.status(404).send("User not found");
            return
        }

        // Purpose: Find whether transaction exists in original user
        // if returns a transaction, it would've been deleted so assume deleted
        // returns undefined if not found, therefore it was never deleted return 404
        const transactionRemoved = user.transactions.find(transaction => transaction._id == transactionId)
        
        if (transactionRemoved){
            res.status(200).send("Transaction deleted successfully");
        } else {
            res.status(404).send("Transaction ID is not found")
        }
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

        // Check user exists
        const userCheck = await User.findOne({_id: userId})
        if (!userCheck){
            res.status(404).send("User not found")
            return
        }

        // Check transaction exists
        if (!userCheck.transactions.find(transaction => transaction._id == transactionId)){
            res.status(404).send("Transaction not found")
            return
        }

        // Create object to set spesific fields
        const setObject = {} 
        for (const key in update){
            setObject[`transactions.$.${key}`] = update[key]
        }

        // Get User
        const user = await User.updateOne({_id: userId, "transactions._id": transactionId}, {$set: setObject})
        res.status(200).send("Update Successful")
    } catch (err){
        if (err instanceof InvalidIdFormatException){
            res.status(400).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
}