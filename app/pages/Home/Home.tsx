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
import { CustomHeaderBtn } from "../../components/CustomHeaderBtn"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

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
                        case "SettingsRoot":
                            iconName = "settings"
                            break
                    }

                    if (route.name == "BanksRoot"){
                        return <MaterialCommunityIcons name="bank" size={size} color={color}/>
                    } else {
                        return <MaterialIcons name={iconName} size={size} color={color}/>
                    }
                }, headerTitleAlign: "center", drawerType: "front", headerShown: false
            })
        } 
        drawerContent={(props) => <CustomDrawer {...props}/>}
        >
                <Drawer.Screen name="Dashboard" component={Dashboard} options={{headerShown: true}}/>
                <Drawer.Screen name="BanksRoot" component={BanksRoot} options={{title: "Banks"}}/>
                <Drawer.Screen name="SettingsRoot" component={SettingsRoot} options={{title: "Settings"}}/>
        </Drawer.Navigator>
    )
}