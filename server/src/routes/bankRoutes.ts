import {Router} from "express"
import {
    addBank, 
    updateBank,
    deleteBank
} from "../controllers/bankController"

const bankRouter: Router = Router()

bankRouter.post("/add", addBank)
bankRouter.post("/update", updateBank)
bankRouter.delete("/delete", deleteBank)

export default bankRouter