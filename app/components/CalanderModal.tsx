import {Modal, View, StyleSheet} from "react-native"
import DateTimePicker from "react-native-ui-datepicker"
import dayjs from "dayjs"
import { Dispatch, SetStateAction, useState } from "react"

type CalandarModalProps = {
    modalVisible: boolean
    setModalVisible: Dispatch<SetStateAction<boolean>>
}

const CalandarModal = ({modalVisible, setModalVisible}: CalandarModalProps) => {
    const [date, setDate] = useState(dayjs())

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
                        <DateTimePicker mode="single" date={date} onChange={(params) => setDate(dayjs(params.date))}/>
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
})