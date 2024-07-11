import React, {Dispatch, SetStateAction, useContext} from "react"
import {loginContext} from "../../AppContext"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {createDrawerNavigator, DrawerContent} from "@react-navigation/drawer"
import {Dashboard} from "../Dashboard/Dashboard"
import {BanksRoot} from "../Bank/BanksRoot"
import {SettingsRoot} from "../Settings/SettingsRoot"
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {CustomDrawer} from "./CustomDrawer"

const Drawer = createDrawerNavigator()

export const Home = () => {
    return (
        <Drawer.Navigator
            screenOptions = { ({route}) => ({
                drawerIcon: ({color, size}) => {
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
                }, headerTitleAlign: "center", drawerType: "front"
            })
        } 
        drawerContent={(props) => <CustomDrawer {...props}/>}
        >
            <Drawer.Screen name="Dashboard" component={Dashboard}/>
            <Drawer.Screen name="Banks" component={BanksRoot}/>
            <Drawer.Screen name="Settings" component={SettingsRoot}/>
        </Drawer.Navigator>
    )
}