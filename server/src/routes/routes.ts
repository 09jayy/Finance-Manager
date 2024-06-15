import {Router} from "express"
import {getUsers, addUser, findUser, deleteUser, updateUser} from "../controllers/controller"

const router: Router = Router()

router.get("/users", getUsers)
router.post("/users", addUser)
router.post("/users/login", findUser)
router.delete("/users/delete", deleteUser)
router.patch("/users/update", updateUser)

export default router