import express, { Application } from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import router from "./routes/routes"
import config from "./config/config"

dotenv.config()

const app: Application = express()

app.use(cors())
app.use(express.json())

app.use("/finance-manager",router)

mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB CONNECTED'))
    .catch(err => console.log(err));

const PORT = config.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));