import mongoose, {Schema, Model} from "mongoose"
import { NextFunction } from "express"

export interface IBank {
    _id: String
    name: String
}

export const bankSchema: Schema = new Schema<IBank>({
    name: {
        type: String,
        required: true
    }
})

const Bank = mongoose.model<IBank>("Bank", bankSchema)

export default Bank