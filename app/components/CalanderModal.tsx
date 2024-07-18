import {Modal, View, StyleSheet, Pressable, Text, TouchableOpacity} from "react-native"
import DateTimePicker, { DateType } from "react-native-ui-datepicker"
import dayjs from "dayjs"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { AntDesign } from "@expo/vector-icons"

type CalandarModalProps = {
    modalVisible: boolean
    setModalVisible: Dispatch<SetStateAction<boolean>>
    date: dayjs.Dayjs
    setDate: Dispatch<SetStateAction<dayjs.Dayjs>>
}

export const CalandarModal = ({modalVisible, setModalVisible, date, setDate}: CalandarModalProps) => {
    return (
        <View style={styles.parent}>
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(false)
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                            <Pressable onPress={() => setModalVisible(false)}>
                                <AntDesign name="close" size={24} color="black"/>
                            </Pressable>

                        <DateTimePicker mode="single" date={date.toDate()} onChange={(params) => {setDate(dayjs(params.date).add(1, "hour"))}}/>

                        <TouchableOpacity onPress={()=>{setModalVisible(false)}} style={styles.confirmBtn}>
                            <Text style={styles.confirmText}>CONFIRM</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5, 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    confirmBtn: {
        marginLeft: "auto"
    },
    confirmText: {
        color: "#1776e3",
        fontWeight: "500"
    }
})