import {Router} from "express"
import {getUsers, addUser, findUser} from "../controllers/controller"

const router: Router = Router()

router.get("/users", getUsers)
router.post("/users", addUser)
router.post("/users/login", findUser)

export default router