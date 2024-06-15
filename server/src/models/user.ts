import mongoose, {Schema, Model} from "mongoose"
import { NextFunction } from "express"

export interface ITransaction {
    date: Date
    transType: String
    des: String
    pay: Number
}

export interface IUser {
    name: String
    email: String
    transactions: Array<ITransaction>
    dateCreated: Date | undefined
    lastUpdated: Date | undefined
    balance: Number 
    password: String
}

interface UserMethods extends Model<IUser>{
    findByEmail(email: String): IUser
}

const TransactionSchema: Schema = new Schema<ITransaction>({
    date: {type: Date, required: true},
    transType: String, 
    des: String,
    pay: { type: Number, required: true}
})

const userSchema: Schema = new Schema<IUser>({
    balance: Number,
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    }, 
    transactions: {
        type: [TransactionSchema]
    }, 
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

userSchema.pre('save', async function (next: NextFunction) {
    this.lastUpdated = Date.now()
    next() 
})

const User = mongoose.model<IUser, UserMethods>("User", userSchema)

export default User