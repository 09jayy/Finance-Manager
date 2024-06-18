import mongoose, {Schema, Model} from "mongoose"
import { NextFunction } from "express"

export interface ITransaction {
    _id: String
    date: Date
    transType: String
    des: String
    pay: Number
}

export const transactionSchema: Schema = new Schema<ITransaction>({
    date: {type: Date, required: true, default: () => Date.now()},
    transType: String, 
    des: String,
    pay: { type: Number, required: true}
})

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction