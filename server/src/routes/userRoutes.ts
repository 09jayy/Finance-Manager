import {Router} from "express"
import {
    getUsers, 
    addUser, 
    findUser, 
    deleteUser, 
    updateUser, 
    sendDataTest,
    getUser,
    checkPassword
} from "../controllers/userController"


import {checkToken} from "../middleware/authMiddleware"

const userRouter: Router = Router()

userRouter.get("/", getUsers)
userRouter.get("/get", checkToken, getUser)
userRouter.post("/add", addUser)
userRouter.post("/login", findUser)
userRouter.delete("/delete", checkToken, deleteUser)
userRouter.patch("/update", checkToken, updateUser)
userRouter.post("/password", checkToken, checkPassword)

userRouter.post("/test", sendDataTest)

export default userRouter