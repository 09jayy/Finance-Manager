import {useContext, useState} from "react"
import { Text, TextInput, SafeAreaView, TouchableOpacity } from "react-native"
import {settingsContext} from "./SettingsContext"
import {submitDetails} from "./functions/detailsFormFunctions"

export interface DetailsType {
    name: string,
    email: string, 
    currentPassword: string, 
    newPassword: string, 
    confirmPassword: string
}

export const DetailsForm = () => {
    const {userData, setUserData} = useContext(settingsContext)

    const [details, setDetails] = useState<DetailsType>({
        name: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const updateDetail = (key: string, value: string) => {
        setDetails(prevDetails => ({...prevDetails, [key]: value}))
    }

    return (
        <SafeAreaView>
            <Text>Change Name: </Text>
            <TextInput placeholder={userData!.name} value={details.name} onChange={e => updateDetail("name", details.name)}/>

            <Text>Change Email: </Text>
            <TextInput placeholder={userData!.email} value={details.email} onChange={e => updateDetail("email", details.email)}/>

            <Text>Change Password</Text>
            <TextInput placeholder="Current Password..." value={details.currentPassword} onChange={e => updateDetail("currentPassword",details.currentPassword)}/>
            <TextInput placeholder="New Password..." value={details.newPassword} onChange={e => updateDetail("newPassword", details.newPassword)}/>
            <TextInput placeholder="Confirm Password..." value={details.confirmPassword} onChangeText={e => updateDetail("confirmPassword", details.confirmPassword)}/>

            <TouchableOpacity onPress={() => submitDetails(details)}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}