import {useState, useEffect, SetStateAction, Dispatch} from "react"
import {View, Text, SafeAreaView, ActivityIndicator} from "react-native"
import {getUserData, UserData} from "./functions"

export const SettingsPage = () => {
    const [userData, setUserData] : [UserData, Dispatch<SetStateAction<UserData>>] = useState({name: "", email: ""})
    const [loading, setLoading]= useState(true)

    useEffect( () => {
        getUserData().then(data => {
            setUserData(data)
            setLoading(false)
        }).catch( (error: Error) => {
            console.log(error)
        })
    }, [])

    return (
        <SafeAreaView>
            <Text>Account</Text>
            {
                loading ? (
                    <ActivityIndicator/> 
                ) : (
                    <View>
                        <Text>{userData.name}</Text>
                        <Text>{userData.email}</Text>
                    </View>
                )
            }
        </SafeAreaView>
    )
}