import {Router} from 'express'
import userRouter from './userRoutes'
import transactionRouter from './transactionRoutes'
import bankRouter from './bankRoutes'

const router: Router = Router()

// Use the individual route modules
router.use("/users", userRouter)
router.use("/transactions", transactionRouter)
router.use("/banks", bankRouter)

export default router