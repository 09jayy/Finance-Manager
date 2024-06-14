import mongoose, {Schema} from "mongoose"

const TransactionSchema: Schema = new Schema({
    date: {type: Date, required: true},
    transType: String, 
    des: String,
    pay: { type: Number, required: true}
})

const userSchema: Schema = new Schema({
    name: {
        type: String, 
        required: true
    },
    transations: {
        type: [TransactionSchema]
    }, 
    dateCreated: {
        type: Date, 
        immutable: true,
        default: () => Date.now()
    }, 
    balance: Number
})

const User = mongoose.model("User", userSchema)

export default User