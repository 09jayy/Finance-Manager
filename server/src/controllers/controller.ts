import { Request, Response} from "express"
import bcrypt from "bcrypt"
import User, {IUser, ITransaction } from "../models/user"
import doesUserExist from "./controlHelper"

type User = {
    name: string
    password: string
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try{
        const users = await User.find()
        res.status(200).json(users)
    } catch (err){
        res.status(500).json( { message: "Error fetching users", error: err})
    }
}

export const addUser = async (req: Request, res: Response): Promise<void> => {
    if (await doesUserExist(req.body.email) == true){
        res.status(400).send("Email already has associated account")
    }

    try {
        const {name, password, email} : {name: String, password: String, email: String} = req.body

        const hashedPassword: String = await bcrypt.hash(password, 10)
        
        const user = new User<IUser>({
            email: email, 
            name: name,
            password: hashedPassword,
            balance: 0, 
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


export const findUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user: IUser | null = await User.findByEmail(req.body.email)

        if (user == null){
            return res.status(400).send("User not found")
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

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedUser: IUser | null = await User.findByIdAndDelete(req.body.id)
        if (deletedUser != null){
            res.status(200).send("id: " + req.body.id + " successfully deleted")
        } else {
            res.status(404).send("User _id: " + req.body.id + " not found")
        } 
    } catch (err){
        res.status(400).send(err)
    }
}