import mongoose, {Schema, Model} from "mongoose"
import { NextFunction } from "express"
import {bankSchema, IBank} from "./bank"
import {transactionSchema, ITransaction} from "./transaction"

export interface IUser extends Document{
    _id: String
    name: String
    email: String
    transactions: Array<mongoose.Schema.Types.ObjectId>
    dateCreated: Date | undefined
    lastUpdated: Date | undefined
    banks: Array<IBank> 
    password: String
}

interface UserMethods extends Model<IUser>{
    findByEmail(email: String): IUser
}

const userSchema: Schema = new Schema<IUser>({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    }, 
    banks: {
        type: [bankSchema], 
    }, 
    transactions: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Transaction"
    }], 
    dateCreated: {
        type: Date, 
        immutable: true,
        default: () => Date.now()
    }, 
    lastUpdated: {
        type: Date, 
        default: () => Date.now()
    }, 
    password: {
        type: String,
        required: true
    } 
}, {
    statics: {
        findByEmail(email: string){
            // RegExp defines strictly matching string without case sensitivity 
            return User.findOne({email: new RegExp("^" + email + "$", "i")})
        }
    }
})

userSchema.pre<IUser>('save', async function (next: NextFunction) {
    this.lastUpdated = new Date()
    next() 
})

const User = mongoose.model<IUser, UserMethods>("User", userSchema)

export default User