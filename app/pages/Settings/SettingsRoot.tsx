import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {View} from "react-native"
import {SettingsPage} from "./SettingsPage"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { getUserData, UserData } from "./functions/rootFunctions"
import {settingsContext} from "./SettingsContext"
import {DetailsForm} from "./DetailsForm"
import { CustomBackBtn } from "../../components/CustomBackBtn"

const Stack = createNativeStackNavigator() 

export const SettingsRoot = () => {
    const [userData, setUserData] = useState(null as unknown as UserData)

    return (
        <settingsContext.Provider value={{userData, setUserData}}>
            <Stack.Navigator screenOptions={{headerLeft: () => <CustomBackBtn/>}}>
                <Stack.Screen name="SettingsPage" component={SettingsPage}/>
                <Stack.Screen name="DetailsForm" component={DetailsForm} options={{headerLeft: () => <CustomBackBtn/>}}/>
            </Stack.Navigator>
        </settingsContext.Provider>
    )
}