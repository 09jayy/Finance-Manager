import {Router} from "express"
import {
    addBank, 
    updateBank,
    deleteBank,
    getAllBanks
} from "../controllers/bankController"
import {checkToken} from "../middleware/authMiddleware"
import { deleteTransactionsFromBank } from "../middleware/bankMiddleware"

const bankRouter: Router = Router()

bankRouter.post("/add", checkToken, addBank)
bankRouter.patch("/update", checkToken, updateBank)
bankRouter.delete("/delete", checkToken, deleteBank, deleteTransactionsFromBank)
bankRouter.get("/get", checkToken, getAllBanks)

export default bankRouter