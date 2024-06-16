import mongoose, {Schema, Model} from "mongoose"
import { NextFunction } from "express"
import { InvalidIdFormatException } from "../exceptions"

export interface ITransaction {
    _id: String
    date: Date
    transType: String
    des: String
    pay: Number
}

export interface IUser extends Document{
    _id: String
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
    date: {type: Date, required: true, default: () => Date.now()},
    transType: String, 
    des: String,
    pay: { type: Number, required: true}
})

const userSchema: Schema = new Schema<IUser>({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    }, 
    balance: {
        type: Number, 
        default: 0
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

userSchema.pre<IUser>('save', async function (next: NextFunction) {
    this.lastUpdated = new Date()
    next() 
})

// Function returns error when ID given is in an invalid format
// Ensures that a 400 status code can be sent rather than 500
function isIdValid(query) : InvalidIdFormatException{
    const find = query.getQuery()

    for (const condition in find){
        if (condition === "_id"){
            if (!mongoose.isValidObjectId(find[condition])){
                return new InvalidIdFormatException("Search ID is invalid format")
            } 
        }
    }
    return null
}

userSchema.pre('findOneAndUpdate', function(next: NextFunction){
    const err = isIdValid(this)
    if (isIdValid == null){
        next()
    } else {
        next(err)
    }
})

userSchema.pre('findOne', function(next: NextFunction){
    const err = isIdValid(this)
    if (isIdValid == null){
        next()
    } else {
        next(err)
    }
})

userSchema.pre('findOneAndDelete', function(next: NextFunction){
    const err = isIdValid(this)
    if (isIdValid == null){
        next()
    } else {
        next(err)
    }
})

const User = mongoose.model<IUser, UserMethods>("User", userSchema)

export default User