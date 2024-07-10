import React, {Dispatch, SetStateAction, useContext} from "react"
import {loginContext} from "../../AppContext"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {Dashboard} from "../Dashboard/Dashboard"
import {BanksRoot} from "../Bank/BanksRoot"
import {SettingsRoot} from "../Settings/SettingsRoot"
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export const Home = () => {
    return (
        <Tab.Navigator
        screenOptions={ ({route}) => ({
            tabBarIcon: ({color, size}) => {
                let iconName: "dashboard" | "settings" | undefined = undefined

                switch (route.name){
                    case "Dashboard":
                        iconName = "dashboard"
                        break
                    case "Settings":
                        iconName = "settings"
                        break
                }

                if (route.name == "Banks"){
                    return <MaterialCommunityIcons name="bank" size={size} color={color}/>
                } else {
                    return <MaterialIcons name={iconName} size={size} color={color}/>
                }
            }, headerTitleAlign: "center"
        })
        }
        >
            <Tab.Screen name="Dashboard" component={Dashboard}/>
            <Tab.Screen name="Banks" component={BanksRoot}/>
            <Tab.Screen name="Settings" component={SettingsRoot}/>
        </Tab.Navigator>
    )
}