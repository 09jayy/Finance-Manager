import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable, TouchableHighlight, Alert} from "react-native"
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import {styles} from "../styles/EditFormStyles"

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
    selectedId: string
    title: string
    submitFunction: (arg0?: any, ...args: any[]) => Promise<Response>
    showDelete: boolean
    deleteFunction?: (selectedId: string) => Promise<Response>
    children?: ReactNode
}

export const EditForm = ({editObject, modalVisible, setModalVisible, selectedId, title, submitFunction, showDelete, deleteFunction, children}: props) => {
    const [inputObject, setInputObject]: [{[key: string]: any}, Dispatch<SetStateAction<object>>] = useState({})
    const [errorMessage, setErrorMessage] = useState("")

    const updateDetail = (key: string, value: string) => {
        setInputObject(prev => ({...prev, [key]: value}))
    }

    const deleteAlert = () => {
        Alert.alert("Delete", "Are you sure you want to delete this?",[
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel"
            },
            {
                text: "Confirm",
                onPress: () => {deleteFunction && deleteFunction(selectedId)
                    .then(response => {
                        if (!response.ok){
                            return response.text().then(text => {throw new Error(text)})
                        }

                        setModalVisible(false)
                    }).catch((error: Error) => {
                        setErrorMessage(error.message)
                    })
                }
            }
        ])
    }

    return (
        <View style={styles.parent}>
            <Modal
                visible={modalVisible}
                animationType="fade"
                onRequestClose={()=>{setModalVisible(false)}}
                onShow={()=>{setInputObject(createObjectEmptyValues(editObject)); setErrorMessage("")}}
                transparent={true}
                statusBarTranslucent={true}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* HEADER CONTAINER (TITLE AND CLOSE BUTTON)*/}
                        <View style={styles.header}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{title}</Text>
                            </View>

                            <Pressable style={styles.close} onPress={() => setModalVisible(false)}>
                                <AntDesign name="close" size={24} color="black" />
                            </Pressable>
                        </View>

                        {/* MODAL CONTENT INPUT FIELDS*/}
                        <View>
                        {
                            Object.entries(editObject).map(([key, value], index) => (
                                (key != "_id" && key != "__v" && key!="date" && key!="bank") && 
                                <View key={index}>
                                    <Text style={styles.label}>{capitalise(key)}</Text>
                                    <TextInput 
                                        placeholder={ !(typeof value == "string") ? `£${value.toLocaleString()}` : value}
                                        keyboardType={ (typeof value == "number") ? "numeric" : "default"} 
                                        value={inputObject[key]} 
                                        onChangeText={val => updateDetail(key, val)}
                                        style={styles.input}
                                    />
                                    <View style={{backgroundColor: "black", width: "100%",height: 2, marginBottom: 10}}></View>
                                </View>
                            ))
                        }
                        {children}
                        </View>

                        <View style={styles.controlContainer}>
                            <Text style={styles.errorMessage}>{errorMessage}</Text>

                            <TouchableOpacity style={styles.submitBtn}onPress={() => {
                                submitFunction(inputObject, selectedId)
                                    .then(response => {
                                        if (!response.ok){
                                            return response.text().then(text => {throw new Error(text)})
                                        }

                                        setModalVisible(false)
                                    }).catch( (error: Error) => {
                                        console.error(error.message)
                                        setErrorMessage(error.message)
                                    })
                                }}>
                                <Text style={styles.submitText}>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>

                        { showDelete && 
                            <Pressable style={styles.deleteBtn} onPress={()=>{deleteAlert()}}>
                                <Feather name="trash-2" size={20} color="black" />
                            </Pressable>
                        }
                    </View>
                </View>
            </Modal>
        </View>
    )
}