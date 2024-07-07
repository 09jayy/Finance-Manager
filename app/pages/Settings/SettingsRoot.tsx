import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {View} from "react-native"
import {SettingsPage} from "./SettingsPage"

const Stack = createNativeStackNavigator() 

export const SettingsRoot = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="SettingsPage" component={SettingsPage}/>
        </Stack.Navigator>
    )
}