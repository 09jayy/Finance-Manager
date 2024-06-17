import dotenv from "dotenv"

dotenv.config() 

export default {
    mongoURI: process.env.MONGODB_URI, 
    port: process.env.PORT || 3000,
    tokenSecret: process.env.TOKEN_SECRET
}