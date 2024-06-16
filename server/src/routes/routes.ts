import {Router} from "express"
import {
    getUsers, 
    addUser, 
    findUser, 
    deleteUser, 
    updateUser, 
    addTransaction, 
    deleteTransaction, 
    updateTransaction, 
    getTransactions
} from "../controllers/controller"

const router: Router = Router()

// USER RELATED ROUTES
router.get("/users", getUsers)
router.post("/users", addUser)
router.post("/users/login", findUser)
router.delete("/users/delete", deleteUser)
router.patch("/users/update", updateUser)

// TRANSACTION RELATED ROUTES
router.post("/users/transaction/add", addTransaction)
router.delete("/users/transaction/delete", deleteTransaction)
router.patch("/users/transaction/update", updateTransaction)
router.get("/users/transaction", getTransactions)

export default router