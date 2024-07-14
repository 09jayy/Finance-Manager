import { useContext, useState } from "react"
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet} from "react-native"

const capitalise = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

export const EditForm = ({route, navigation}: any) => {
    const {editObject, title} = route.params
    navigation.setOptions({title: title})

    return (
        <SafeAreaView>
            <View style={styles.inputContainer}>
            {
                Object.entries(editObject).map(([key, value], index) => (
                    key != "_id" && 
                    <View key={index} style={styles.fieldContainer}>
                        <Text style={styles.key}>{capitalise(key)}</Text>
                        <TextInput placeholder={ !(typeof value == "string") ? `£${value}` : value} style={styles.valueInput}/>
                    </View>
                ))
            }
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    key: {
        fontSize: 18,
        paddingLeft: 20,
        paddingBottom: 5,
        marginTop: 10
    },
    valueInput: {
        width: "100%",
        backgroundColor: "white",
        fontSize: 16, 
        padding: 3,
        paddingLeft: 20
    },
    fieldContainer: {
        marginTop: 5,
        marginBottom: 5
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
    btnContainer: {
        marginTop: 60,
        alignItems: "center"
    },
    inputContainer: {
        marginTop: 15
    },
    submitError: {
        color: "#d12304",
        textAlign: "center",
        padding: 10
    },
})