import {Router} from "express"
import {
    addBank, 
    updateBank,
    deleteBank,
    getAllBanks
} from "../controllers/bankController"
import {checkToken} from "../middleware/authMiddleware"

const bankRouter: Router = Router()

bankRouter.post("/add", checkToken, addBank)
bankRouter.post("/update", checkToken, updateBank)
bankRouter.delete("/delete", checkToken, deleteBank)
bankRouter.get("/get", checkToken, getAllBanks)

export default bankRouter