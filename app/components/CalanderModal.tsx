import {Modal, View, StyleSheet, Pressable, Text, TouchableOpacity} from "react-native"
import DateTimePicker, { DateType } from "react-native-ui-datepicker"
import dayjs from "dayjs"
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"
import { AntDesign } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"

type CalandarModalProps = {
    modalVisible: boolean
    setModalVisible: Dispatch<SetStateAction<boolean>>
    date: dayjs.Dayjs
    setDate: Dispatch<SetStateAction<dayjs.Dayjs>>
}

export const CalandarModal = ({modalVisible, setModalVisible, date, setDate}: CalandarModalProps) => {
    // initial date before modification is recorded so that if the user cancels - the date is set back to original date
    const [initialDate, setInitialDate] = useState(dayjs())
    useFocusEffect(useCallback(() => {
        setInitialDate(date)
    }, [modalVisible]))

    return (
        <View style={styles.parent}>
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    setDate(initialDate)
                    setModalVisible(false)
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                            <Pressable style={{marginLeft: "auto", margin: 5}} onPress={() => {setDate(initialDate); setModalVisible(false)}}>
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