import { Request, Response, NextFunction} from "express"
import bcrypt from "bcrypt"
import User from "../models/user"

type User = {
    name: string
    password: string
}

const users = []

export const getUsers = (req: Request, res: Response): void => {
    res.json(users)
}

export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const hashedPassword: string = await bcrypt.hash(req.body.password, 10)
        const user: User = { name: req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
}

export const findUser = async (req: Request, res: Response): Promise<Response> => {
    const user: User = users.find(user => user.name === req.body.name)
    if (user == null){
        return res.status(400).send("User not found")
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)){
            res.send("Success")
        } else {
            res.send("Incorrect")
        }
    } catch {
        res.status(500).send()
    }
}