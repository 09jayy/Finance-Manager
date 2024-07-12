import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {View, Text} from "react-native"
import {BanksPage} from "./BanksPage"
import {TransactionForm} from "./TransactionForm"
import { useState } from "react"
import {banksContext} from "./BanksContext"
import { EditForm } from "../../components/EditForm"

const Stack = createNativeStackNavigator()

export const BanksRoot = () => {
    const [editObject, setEditObject] = useState({})
    const [title, setTitle] = useState("")

    return (
        <banksContext.Provider value={{editObject, setEditObject, title, setTitle}}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen component={BanksPage} name="BanksPage"/>
                <Stack.Screen component={TransactionForm} name="TransactionForm"/>
                <Stack.Screen component={EditForm} name="EditForm"/>
            </Stack.Navigator>
        </banksContext.Provider>
    )
}