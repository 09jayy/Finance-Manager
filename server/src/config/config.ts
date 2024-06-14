import dotenv from "dotenv"

dotenv.config() 

export default {
    mongoURI: process.env.MONGODB_URI as string, 
    port: process.env.PORT || 3000
}