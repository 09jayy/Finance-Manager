import {useContext, useState} from "react"
import { Text, TextInput, SafeAreaView, TouchableOpacity } from "react-native"
import {settingsContext} from "./SettingsContext"
import {UserData} from "./functions/rootFunctions"
import {CustomList} from "./components/CustomList"

export const DetailsForm = () => {
    const {userData, setUserData} = useContext(settingsContext)
    const [changeName, setChangeName] = useState("")
    const [changeEmail, setChangeEmail] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [changePassword, setChangePassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    return (
        <SafeAreaView>
            <Text>Change Name: </Text>
            <TextInput placeholder={userData!.name} value={changeName} onChangeText={value => setChangeName(value)}/>

            <Text>Change Email: </Text>
            <TextInput placeholder={userData!.email} value={changeEmail} onChangeText={value => setChangeEmail(value)}/>

            <Text>Change Password</Text>
            <TextInput placeholder="Current Password..." value={currentPassword} onChangeText={value => setCurrentPassword(value)}/>
            <TextInput placeholder="New Password..." value={changePassword} onChangeText={value => setChangePassword(value)}/>
            <TextInput placeholder="Confirm Password..." value={confirmPassword} onChangeText={value => setConfirmPassword(value)}/>

            <TouchableOpacity>
                <Text>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}