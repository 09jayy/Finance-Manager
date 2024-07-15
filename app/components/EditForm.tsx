import { Dispatch, SetStateAction, useEffect, useState } from "react"
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable} from "react-native"
import { Bank, getBankData, updateBank } from "../pages/Bank/functions/banksPageFunction"

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
    bankId: string
    setBanks: Dispatch<SetStateAction<Bank[]>>
}

export const EditForm = ({editObject, modalVisible, setModalVisible, bankId, setBanks}: props) => {
    const [inputObject, setInputObject]: [{[key: string]: any}, Dispatch<SetStateAction<object>>] = useState({})
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(()=>{
        setInputObject(createObjectEmptyValues(editObject))
        setErrorMessage("")
    },[editObject, modalVisible])

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
                    (key != "_id" && key != "__v") && 
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

            <Text>{errorMessage}</Text>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    updateBank(inputObject, bankId)
                        .then(response => {
                            if (!response.ok){
                                return response.text().then(text => {throw new Error(text)})
                            }

                            setModalVisible(false)
                            getBankData().then( (data: Bank[]) => {
                                setBanks(data)
                            })
                        }).catch( (error: Error) => {
                            setErrorMessage(error.message)
                        })
                    }}>
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
        marginTop: 15,
        backgroundColor: "gray "
    },
    submitError: {
        color: "#d12304",
        textAlign: "center",
        padding: 10
    },
})