import mongoose, {Schema, Model} from "mongoose"

export interface ITransaction {
    _id: String
    date: Date
    name: String
    description: String
    pay: Number
    bank: mongoose.Schema.Types.ObjectId
}

export const transactionSchema: Schema = new Schema<ITransaction>({
    date: {type: Date, required: true, default: () => Date.now()},
    name: String, 
    description: String,
    pay: { type: Number, required: true},
    bank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bank"  
    }
})

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction