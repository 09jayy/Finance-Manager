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
} from "../controllers/bankController"

const router: Router = Router()

// USER ROUTES
router.get("/users", getUsers)
router.post("/users", addUser)
router.post("/users/login", findUser)
router.delete("/users/delete", deleteUser)
router.patch("/users/update", updateUser)

// TRANSACTION ROUTES
router.post("/users/transaction/add", addTransaction)
router.delete("/users/transaction/delete", deleteTransaction)
router.patch("/users/transaction/update", updateTransaction)
router.get("/users/transaction", getTransactions)

// BANK ROUTES
router.post("/users/bank/add", addBank)

// TESTING ROUTE
router.post("/test", sendDataTest)

export default router