import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {View, Text} from "react-native"
import {BanksPage} from "./BanksPage"
import { useState } from "react"
import { EditForm } from "../../components/EditForm"
import { CustomHeaderBtn } from "../../components/CustomHeaderBtn"

const Stack = createNativeStackNavigator()

export const BanksRoot = () => {
    return (
        <Stack.Navigator screenOptions={{headerLeft: () => <CustomHeaderBtn/>, headerTitleAlign: "center"}}>
            <Stack.Screen component={BanksPage} name="Banks"/>
        </Stack.Navigator>
    )
}