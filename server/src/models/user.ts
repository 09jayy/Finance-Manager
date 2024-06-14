import mongoose, {Schema, Model} from "mongoose"

export interface ITransaction {
    date: Date
    transType: String
    des: String
    pay: Number
}

export interface IUser {
    name: String
    transactions: Array<ITransaction>
    dateCreated: Date | undefined, 
    balance: Number, 
    password: String
}

export interface UserMethods extends Model<IUser>{
    findByName(name: String): any
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
        findByName(name: string){
            return User.findOne({name: new RegExp(name, "i")})
        }
    }
})

const User = mongoose.model<IUser, UserMethods>("User", userSchema)

export default User