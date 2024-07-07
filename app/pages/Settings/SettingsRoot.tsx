import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {View} from "react-native"
import {SettingsPage} from "./SettingsPage"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { getUserData, UserData } from "./functions"
import {settingsContext} from "./SettingsContext"
import {DetailsForm} from "./DetailsForm"

const Stack = createNativeStackNavigator() 

export const SettingsRoot = () => {
    const [userData, setUserData] = useState(null as unknown as UserData)

    useEffect( () => {
        getUserData().then(data => {
            setUserData(data)
        }).catch( (error: Error) => {
            console.log(error)
        })
    }, [])

    return (
        <settingsContext.Provider value={{userData, setUserData}}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="SettingsPage" component={SettingsPage}/>
                <Stack.Screen name="DetailsForm" component={DetailsForm}/>
            </Stack.Navigator>
        </settingsContext.Provider>
    )
}