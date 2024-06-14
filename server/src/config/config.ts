import dotenv from "dotenv"

dotenv.config() 

console.log("DOES THIS LOAD" + process.env.MONGODB_URI)

export default {
    mongoURI: process.env.MONGODB_URI, 
    port: process.env.PORT || 3000
}