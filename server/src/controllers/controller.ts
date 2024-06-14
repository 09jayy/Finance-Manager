import { Request, Response, NextFunction} from "express"
import bcrypt from "bcrypt"
import User, {IUser, ITransaction } from "../models/user"

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
    try {
        const {name, password} : {name: String, password: String} = req.body

        const hashedPassword: String = await bcrypt.hash(password, 10)
        
        const user = new User<IUser>({
            name: name,
            password: hashedPassword,
            balance: 0, 
            transactions: new Array<ITransaction>,
            dateCreated: undefined
        })

        const newUser = await user.save()
        res.status(201).send(newUser)
    } catch (err) {
        res.status(500).send({message: err.message})
    }
}

export const findUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user: IUser | null = await User.findByName(req.body.name)

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