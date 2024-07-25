import {Request, Response} from "express"
import Transaction from "../models/transaction"

export const deleteTransactionsFromBank = async (req: Request,res: Response) => {
    const transactionDelete = await Transaction.deleteMany({bank: req.body.bankId})
    console.log(transactionDelete)

    res.status(200).send("Bank and associated Transactions successfully deleted")
}