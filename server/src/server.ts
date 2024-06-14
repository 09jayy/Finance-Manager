import express, {Express, Request, Response, NextFunction} from "express"
import bcrypt from "bcrypt"

const app: Express = express()

type User = {
    name: string
    password: string
}

const users = []

app.use(express.json())

app.get("/users", (req: Request, res: Response) => {
    res.json(users)
})

app.post("/users", async (req: Request, res: Response) => {
    try {
        const hashedPassword: string = await bcrypt.hash(req.body.password, 10)
        const user: User = { name: req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

app.post("/users/login", async (req: Request, res: Response) => {
    const user: User = users.find(user => user.name === req.body.name)
    if (user == null){
        return res.status(400).send("User not found")
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)){
            res.send("Success")
        } else {
            res.send("Incorrect")
        }
    } catch {
        res.status(500).send()
    }
})

app.listen(3000)