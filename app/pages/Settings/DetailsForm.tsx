import {useContext, useState} from "react"
import { Text, TextInput, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, View } from "react-native"
import {InputPassword} from "../../components/InputPassword"
import {settingsContext} from "./SettingsContext"
import {submitDetails} from "./functions/detailsFormFunctions"

export interface DetailsType {
    name: string,
    email: string, 
    currentPassword: string, 
    newPassword: string, 
    confirmPassword: string
}

export const DetailsForm = ({navigation}: any) => {
    const {userData, setUserData} = useContext(settingsContext)
    const [submitError, setSubmitError] = useState("")
    const [submitSuccess, setSubmitSuccess] = useState("")

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
            <InputPassword textStyle={styles.input} showOption={true} placeholder="Current Password..." password={details.currentPassword} setPassword={val => updateDetail("currentPassword",val)}/>
            <InputPassword textStyle={styles.input} showOption={true} placeholder="New Password..." password={details.newPassword} setPassword={val => updateDetail("newPassword",val)}/>
            <InputPassword textStyle={styles.input} showOption={false} placeholder="Confirm Password..." password={details.confirmPassword} setPassword={val => updateDetail("confirmPassword",val)}/>


            <Text style={styles.submitError}>{submitError}</Text>
            <Text style={styles.submitSuccess}>{submitSuccess}</Text>

            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => submitDetails(details, setSubmitError, setSubmitSuccess)} style={styles.btn}>
                    <Text style={styles.btnText}>SUBMIT</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.btn, backgroundColor: "#e01414"}} onPress={() => navigation.navigate("SettingsPage")}>
                    <Text style={styles.btnText}>BACK</Text>
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
        height: 40,
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
    btnContainer: {
        flex: 1,
        alignItems: "center",  
    },
    btn: {
        backgroundColor: "#1776e3",
        borderRadius: 5,  
        width: 230,
        height: 30, 
        justifyContent: "center", 
        alignItems: "center",
        margin: 10 
    },
    btnText: {
        color: "white",
        fontSize: 16,
    },
    submitError: {
        color: "#d12304",
        textAlign: "center",
        padding: 10
    },
    submitSuccess: {
        color: "#10b510",
        textAlign: "center",
        padding: 10
    }
})