import {Router} from "express"
import {getUsers, addUser, findUser, deleteUser, updateUser, addTransaction} from "../controllers/controller"

const router: Router = Router()

router.get("/users", getUsers)
router.post("/users", addUser)
router.post("/users/login", findUser)
router.delete("/users/delete", deleteUser)
router.patch("/users/update", updateUser)
router.patch("/users/transaction/add-transaction", addTransaction)

export default router