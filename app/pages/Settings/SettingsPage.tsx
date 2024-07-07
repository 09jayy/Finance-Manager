import {useState, useEffect, SetStateAction, Dispatch, useContext} from "react"
import {View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity, StyleSheet, Alert} from "react-native"
import {getUserData, UserData, logout} from "./functions"
import {Label} from "./components/Label"
import {CustomList} from "./components/CustomList"
import { loginContext } from "../../AppContext"
import { settingsContext} from "./SettingsContext"

export const SettingsPage = () => {
    const {setLoggedIn} = useContext(loginContext)
    const {userData} = useContext(settingsContext)

    const logoutAlert = () => {
        Alert.alert("Logout","Are you sure you want to logout?",[
            {
                text: "Cancel",
                onPress: () => {}, 
                style: "cancel"
            },
            {
                text: "Confirm",
                onPress: () => {logout(setLoggedIn as Dispatch<SetStateAction<boolean>>)},
            }
        ])
    }

    return ( 
        <>
            { userData == undefined ? (
                <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <ActivityIndicator size="large"/>
                </SafeAreaView> 
            ) : (
                <View>
                    <CustomList title="Account Details">
                        <Label title="Name" value={userData.name}/>
                        <Label title="Email" value={userData.email}/>
                        <Label title="Password" value={"***********"}/>
                        <TouchableOpacity>
                            <Text style={{...styles.btn,color: "#077cdb"}}>Change details...</Text>
                        </TouchableOpacity>
                    </CustomList>

                    <CustomList title="Actions">
                        <TouchableOpacity onPress={() => {logoutAlert()}}>
                            <Text style={{...styles.btn, color: "#077cdb"}}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{...styles.btn, color: "#f00707"}}>Delete Account</Text>
                        </TouchableOpacity>
                    </CustomList>
                </View>
            )}
        </>
    )
}


const styles = StyleSheet.create({
    btn: {
        textAlign: "center",
        backgroundColor: "white",
        padding: 10,
        fontSize: 16
    }
})