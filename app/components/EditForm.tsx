import { Dispatch, SetStateAction, useEffect, useState } from "react"
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable} from "react-native"
import { updateBank } from "../pages/Bank/functions/banksPageFunction"

const capitalise = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

const createObjectEmptyValues = (obj: {[key: string]: any}) => {
    const newObj: { [key: string]: any } = {}

    Object.keys(obj).forEach(key => {
        newObj[key] = ""
    })
    return newObj
}

type props = {
    editObject: Object
    modalVisible: boolean
    setModalVisible: Dispatch<SetStateAction<boolean>>
}

export const EditForm = ({editObject, modalVisible, setModalVisible}: props) => {
    const [inputObject, setInputObject]: [{[key: string]: any}, Dispatch<SetStateAction<object>>] = useState({})

    useEffect(()=>{
        setInputObject(createObjectEmptyValues(editObject))
    },[editObject])

    const updateDetail = (key: string, value: string) => {
        setInputObject(prev => ({...prev, [key]: value}))
    }

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
        >
            <Pressable onPress={() => setModalVisible(false)}>
                <Text>Close</Text>
            </Pressable>

            <View style={styles.inputContainer}>
            {
                Object.entries(editObject).map(([key, value], index) => (
                    key != "_id" && 
                    <View key={index} style={styles.fieldContainer}>
                        <Text style={styles.key}>{capitalise(key)}</Text>
                        <TextInput 
                            placeholder={ !(typeof value == "string") ? `£${value}` : value}
                            keyboardType={ (typeof value == "number") ? "numeric" : "default"} 
                            style={styles.valueInput} 
                            value={inputObject[key]} 
                            onChangeText={val => updateDetail(key, val)}
                        />
                    </View>
                ))
            }
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={() => {updateBank(inputObject); setModalVisible(false)}}>
                    <Text style={styles.btnText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        </Modal>
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