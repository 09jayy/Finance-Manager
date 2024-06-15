import { Request, Response} from "express"
import bcrypt from "bcrypt"
import User, {IUser, ITransaction } from "../models/user"

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
        // Checks if email already has an assigned user
        const userArr: Array<IUser> = await User.find().where({email: new RegExp(req.body.email.toString(), 'i')})
        if (userArr.length > 0){
            res.status(400).send("Email already has associated account")
            return
        }

        // Save user to database
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

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, update } = req.body;

        // Checks user with id exists
        const existingUser: IUser | null = await User.findById(id);
        if (!existingUser) {
            res.status(404).send("User not found");
            return
        }

        // User exists, update user
        const updatedUser: IUser | null = await User.findByIdAndUpdate(id, update, { new: true });
        if (!updatedUser) {
            res.status(500).send("Failed to update user");
        } else {
            res.status(200).send("Update Successful");
        }

    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
};