import {Router} from "express"
import {
    getTransactions,
    updateTransaction,
    deleteTransaction,
    addTransaction
} from "../controllers/transactionController"
import {checkToken} from "../middleware/authMiddleware"

const transactionRouter: Router = Router()

transactionRouter.post("/add", checkToken, addTransaction)
transactionRouter.delete("/delete", checkToken, deleteTransaction)
transactionRouter.patch("/update", checkToken, updateTransaction)
transactionRouter.get("/", checkToken, getTransactions)

export default transactionRouter