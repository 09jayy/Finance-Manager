import {useState, useEffect, SetStateAction, Dispatch} from "react"
import {View, Text, SafeAreaView} from "react-native"
import {getUserData, UserData} from "./functions"

export const SettingsPage = () => {
    const [userData, setUserData] : [UserData, Dispatch<SetStateAction<UserData>>] = useState({name: "", email: ""})

    useEffect( () => {
        getUserData().then(data => {
            setUserData(data)
        }).catch( (error: Error) => {
            console.log(error )
        })
    }, [])

    return (
        <SafeAreaView>
            <Text>Account</Text>
            <Text>{userData.name}</Text>
            <Text>{userData.email}</Text>
        </SafeAreaView>
    )
}