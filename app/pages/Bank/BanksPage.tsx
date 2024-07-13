import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import {useState, useEffect, SetStateAction, useContext} from "react"
import {getBankData, Bank} from "./functions/banksPageFunction"
import {Widget} from "../../components/Widget"
import {TitleValueWidget} from "../../components/TitleValueWidget"
import {EditForm} from "../../components/EditForm"
import { banksContext } from "./BanksContext"

export const BanksPage = ({navigation}: any) => {
    const [banks, setBanks] = useState([] as Bank[])
    const {editObject, setEditObject, setTitle} = useContext(banksContext)
    const [newBank, setNewBank] = useState({_id: "", name: "", balance: 0} as Bank)

    useEffect(()=> {
        getBankData()
            .then( (data: Bank[]) => {
                setBanks(data)
            })
    },[])

    return (
        <View>
            <Widget title="Bank Accounts" showAdd={true} addFunction={() => {setEditObject(newBank); setTitle("Add Bank Account"); navigation.navigate("EditForm")}}>
                <View style={styles.bankList}>
                    {banks.map((bank: Bank) => (
                        <TouchableOpacity onPress={() => {setEditObject(bank); setTitle("Edit Bank Account"); navigation.navigate("EditForm")}} key={bank._id}>
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