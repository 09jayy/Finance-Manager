import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import {useState, useEffect, useContext} from "react"
import {getBankData, Bank, updateBank} from "./functions/banksPageFunction"
import {Widget} from "../../components/Widget"
import {TitleValueWidget} from "../../components/TitleValueWidget"
import {EditForm} from "../../components/EditForm"

export const BanksPage = ({navigation}: any) => {
    const [banks, setBanks] = useState([] as Bank[])
    const [modalVisible, setModalVisible] = useState(false)
    const [currentObject, setCurrentObject] = useState({})
    const [bankId, setBankId] = useState("")

    useEffect(()=> {
        getBankData()
            .then( (data: Bank[]) => {
                setBanks(data)
            })
    },[])

    return (
        <View>
            <EditForm modalVisible={modalVisible} setModalVisible={setModalVisible} editObject={currentObject} bankId={bankId} setBanks={setBanks}/>
            <Widget title="Bank Accounts" showAdd={true} addFunction={() => {}}>
                <View style={styles.bankList}>
                    {banks.map((bank: Bank) => (
                        <TouchableOpacity onPress={() => {setCurrentObject(bank); setBankId(bank._id);setModalVisible(true)}} key={bank._id}>
                            <TitleValueWidget title={bank.name} value={`£${bank.balance}`} key={bank._id} direction="column" styleProp={bankAccountStyles}/>
                        </TouchableOpacity>
                    ))}
                </View>
            </Widget>
        </View>
    )
}

const styles = StyleSheet.create({
    bankList: {
        marginTop: 20
    }
})

const bankAccountStyles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "500"
    },
    value: {
        fontSize: 16
    }
})