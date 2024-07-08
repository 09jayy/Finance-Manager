import {useContext, useState} from "react"
import { Text, TextInput, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, View } from "react-native"
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
    const [submitError, setSubmitError] = useState("")

    const [details, setDetails] = useState<DetailsType>({
        name: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const updateDetail = (key: string, value: string) => {
        setDetails(preDetails => ({...preDetails, [key]: value}))
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Name: </Text>
            <TextInput placeholder={userData!.name} value={details.name} onChangeText={val => updateDetail("name", val)} style={styles.input}/>

            <Text style={styles.title}>Email: </Text>
            <TextInput placeholder={userData!.email} value={details.email} onChangeText={val => updateDetail("email", val)} style={styles.input}/>

            <Text style={styles.title}>Password: </Text>
            <TextInput placeholder="Current Password..." value={details.currentPassword} onChangeText={val => updateDetail("currentPassword",val)} style={styles.input}/>
            <TextInput placeholder="New Password..." value={details.newPassword} onChangeText={val => updateDetail("newPassword", val)} style={styles.input}/>
            <TextInput placeholder="Confirm Password..." value={details.confirmPassword} onChangeText={val => updateDetail("confirmPassword", val)} style={styles.input}/>

            <Text style={styles.submitError}>{submitError}</Text>

            <View style={styles.submitContainer}>
                <TouchableOpacity onPress={() => submitDetails(details, setSubmitError)} style={styles.submit}>
                    <Text style={styles.submitText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        width: Dimensions.get("window").width, 
        height: 30,
        backgroundColor: "white", 
        fontSize: 16, 
        paddingLeft: 30,
        marginBottom: 10,
    },
    title: {
        fontSize: 18, 
        margin: 5, 
        marginLeft: 15
    },
    submitContainer: {
        flex: 1,
        alignItems: "center",  
    },
    submit: {
        backgroundColor: "#1776e3",
        borderRadius: 5,  
        width: 230,
        height: 30, 
        justifyContent: "center", 
        alignItems: "center", 
    },
    submitText: {
        color: "white",
        fontSize: 16,
    },
    submitError: {
        color: "#d12304",
        textAlign: "center",
        padding: 10
    }
})