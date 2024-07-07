import {useContext} from "react"
import { View, Text } from "react-native"
import {settingsContext} from "./SettingsContext"

export const DetailsForm = () => {
    const {userData, setUserData} = useContext(settingsContext)
    
    return (
        <View>
            <Text>Details</Text>
        </View>
    )
}