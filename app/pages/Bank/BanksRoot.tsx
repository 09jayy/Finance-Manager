import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {View, Text} from "react-native"
import {BanksPage} from "./BanksPage"
import {TransactionForm} from "./TransactionForm"

const Stack = createNativeStackNavigator()

export const BanksRoot = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen component={BanksPage} name="BanksPage"/>
            <Stack.Screen component={TransactionForm} name="TransactionForm"/>
        </Stack.Navigator>
    )
}