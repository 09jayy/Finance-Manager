import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface AuthResponse extends Response {
    userId?: string;
}

export const checkToken = (req: Request, res: AuthResponse, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

        console.log(decoded)

        res.locals.userId = decoded.payload.userId
        
        next()
    } catch (error) {
        //return res.status(401).json({ message: 'Invalid or expired token' })
        return res.status(401).send(error.message)
    }
}

