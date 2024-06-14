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
    balance: Number,
    password: {
        type: String,
        required: true
    } 
}, {
    statics: {
        findByEmail(email: string){
            return User.findOne({email: new RegExp("^" + email + "$", "i")})
        }
    }
})

userSchema.pre('save', async function (next: NextFunction) {
    const user = this 

    console.log(user.email.toString())

    const userArr = await User.find().where({email: new RegExp(user.email.toString(), 'i')})

    if (userArr.length > 0){
        return next(new Error("A user with this name already exits"))
    }

    next() 
});

const User = mongoose.model<IUser, UserMethods>("User", userSchema)

export default User