import User, {IUser, ITransaction } from "../models/user"


export default async function doesUserExist(email: String) : Promise<boolean>{
    const userArr: Array<IUser> = await User.find().where({email: new RegExp(email.toString(), 'i')})

    if (userArr.length > 0){
        return true
    } else {
        return false
    }
}