import app from "./server"
import config from "./config/config"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB CONNECTED'))
    .catch(err => console.log(err));

const PORT = config.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));