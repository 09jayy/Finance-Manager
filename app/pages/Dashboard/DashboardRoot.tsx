import { View, Text } from "react-native"
import { CustomHeaderBtn } from "../../components/CustomHeaderBtn"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Dashboard } from "./Dashboard"

const Stack = createNativeStackNavigator()

export const DashboardRoot = () => {
    return (
        <Stack.Navigator screenOptions={{headerLeft: () => <CustomHeaderBtn/>, headerTitleAlign: "center"}}>
            <Stack.Screen component={Dashboard} name={"Dashboard"}/>
        </Stack.Navigator>
    )
}