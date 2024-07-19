import {createDrawerNavigator, DrawerContent} from "@react-navigation/drawer"
import {DashboardRoot} from "../Dashboard/DashboardRoot"
import {BanksRoot} from "../Bank/BanksRoot"
import {SettingsRoot} from "../Settings/SettingsRoot"
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {CustomDrawer} from "./CustomDrawer"
import { useContext, useState } from "react"
import { Bank, Transaction } from "../../types/types"
import {homeContext} from "./HomeContext"

const Drawer = createDrawerNavigator()

export const Home = () => {
    const [banks, setBanks] = useState([] as Bank[])
    const [transactions, setTransactions] = useState([] as Transaction[])

    return (
        <homeContext.Provider value={{banks, transactions, setBanks, setTransactions}}>
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
                <Drawer.Screen name="Dashboard" component={DashboardRoot} options={{title: "DashboardRoot"}}/>
                <Drawer.Screen name="BanksRoot" component={BanksRoot} options={{title: "Banks"}}/>
                <Drawer.Screen name="SettingsRoot" component={SettingsRoot} options={{title: "Settings"}}/>
            </Drawer.Navigator>    
        </homeContext.Provider>
    )
}