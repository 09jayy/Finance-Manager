import {Router} from "express"
import {getUsers, addUser, findUser, deleteUser} from "../controllers/controller"

const router: Router = Router()

router.get("/users", getUsers)
router.post("/users", addUser)
router.post("/users/login", findUser)
router.delete("/users/delete", deleteUser)

export default router