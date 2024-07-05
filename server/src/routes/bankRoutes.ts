import {Router} from "express"
import {
    addBank, 
    updateBank,
    deleteBank
} from "../controllers/bankController"
import {checkToken} from "../middleware/authMiddleware"

const bankRouter: Router = Router()

bankRouter.post("/add", checkToken, addBank)
bankRouter.post("/update", checkToken, updateBank)
bankRouter.delete("/delete", checkToken, deleteBank)

export default bankRouter