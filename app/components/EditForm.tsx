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
    title: string
    submitFunction: (inputObject: {[key: string]: any}, bankId: string) => Promise<Response>
}

export const EditForm = ({editObject, modalVisible, setModalVisible, bankId, setBanks, title, submitFunction}: props) => {
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
            <View>
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>

                    <Pressable style={styles.close} onPress={() => setModalVisible(false)}>
                        <Text>Close</Text>
                    </Pressable>
                </View>

                <View>
                {
                    Object.entries(editObject).map(([key, value], index) => (
                        (key != "_id" && key != "__v") && 
                        <View key={index}>
                            <Text>{capitalise(key)}</Text>
                            <TextInput 
                                placeholder={ !(typeof value == "string") ? `£${value}` : value}
                                keyboardType={ (typeof value == "number") ? "numeric" : "default"} 
                                value={inputObject[key]} 
                                onChangeText={val => updateDetail(key, val)}
                            />
                        </View>
                    ))
                }
                </View>

                <View>
                    <Text>{errorMessage}</Text>

                    <TouchableOpacity onPress={() => {
                        submitFunction(inputObject, bankId)
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
                        <Text>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    header:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    titleContainer: {
        flex: 1,
        justifyContent: "center"
    },
    title: {
    },
    close: {
        marginLeft: "auto"
    }
})