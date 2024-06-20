import {Request, Response} from "express"
import bcrypt from "bcrypt"
import User, {IUser} from "../models/user"
import Transaction, {transactionSchema, ITransaction} from "../models/transaction"
import jwt from "jsonwebtoken"
import { Error as MongooseError } from "mongoose"

type genTokenPayload = {
    userId: String
}

const generateAccessToken = (payload: genTokenPayload): string => {
    return jwt.sign({payload}, process.env.TOKEN_SECRET, {expiresIn: '1800s'})
}

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
        const {name, password, email} : {name: String, password: String, email: String} = req.body

        // Checks if email already has an assigned user
        const userArr = await User.findByEmail(email)
        if (userArr != null){
            res.status(400).send("Email already has associated account")
            return
        }

        // Save user to database
        const hashedPassword: String = await bcrypt.hash(password, 10)
        const user = await User.create({
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
            res.status(200).json(generateAccessToken({userId: user._id}))
        } else {
            res.status(400).send("Incorrect")
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
        if (err instanceof MongooseError.CastError){
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
        if (err instanceof MongooseError.CastError){
            res.status(400).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
}

/* 
    MISCELLANEOUS METHODS
*/
export const sendDataTest = (req: Request, res: Response): void =>{
    try{
        console.log(req.body)

        res.status(200).json(req.body)
    } catch (err){
        res.status(500).send(err.message)
    }
}