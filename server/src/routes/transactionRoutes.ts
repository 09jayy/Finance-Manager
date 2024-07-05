import {Router} from "express"
import {
    getTransactions,
    updateTransaction,
    deleteTransaction,
    addTransaction
} from "../controllers/transactionController"


const transactionRouter: Router = Router()

transactionRouter.post("/add", addTransaction)
transactionRouter.delete("/delete", deleteTransaction)
transactionRouter.patch("/update", updateTransaction)
transactionRouter.get("/", getTransactions)

export default transactionRouter