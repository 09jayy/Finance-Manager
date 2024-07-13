import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {View} from "react-native"
import {SettingsPage} from "./SettingsPage"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { getUserData, UserData } from "./functions/rootFunctions"
import {settingsContext} from "./SettingsContext"
import {DetailsForm} from "./DetailsForm"
import { CustomHeaderBtn } from "../../components/CustomHeaderBtn"

const Stack = createNativeStackNavigator() 

export const SettingsRoot = () => {
    const [userData, setUserData] = useState(null as unknown as UserData)

    return (
        <settingsContext.Provider value={{userData, setUserData}}>
            <Stack.Navigator screenOptions={{headerLeft: () => <CustomHeaderBtn/>, headerTitleAlign: "center"}}>
                <Stack.Screen name="Settings" component={SettingsPage}/>
                <Stack.Screen name="DetailsForm" component={DetailsForm} options={{headerTitle: "Edit Account Details"}}/>
            </Stack.Navigator>
        </settingsContext.Provider>
    )
}