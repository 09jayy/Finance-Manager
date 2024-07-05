import {Router} from "express"

import {
    getUsers, 
    addUser, 
    findUser, 
    deleteUser, 
    updateUser, 
    sendDataTest
} from "../controllers/userController"

import {
    getTransactions,
    updateTransaction,
    deleteTransaction,
    addTransaction
} from "../controllers/transactionController"

import {
    addBank, 
    updateBank,
    deleteBank
} from "../controllers/bankController"

import {checkToken} from "../middleware/authMiddleware"

const router: Router = Router()

// USER ROUTES
router.get("/users", getUsers)
router.post("/users", addUser)
router.post("/users/login", findUser)
router.delete("/users/delete", checkToken, deleteUser)
router.patch("/users/update", checkToken, updateUser)

// TRANSACTION ROUTES
router.post("/users/transaction/add", addTransaction)
router.delete("/users/transaction/delete", deleteTransaction)
router.patch("/users/transaction/update", updateTransaction)
router.get("/users/transaction", getTransactions)

// BANK ROUTES
router.post("/users/bank/add", addBank)
router.post("/users/bank/update", updateBank)
router.delete("/users/bank/delete", deleteBank)

// TESTING ROUTE
router.post("/test", sendDataTest)

export default router